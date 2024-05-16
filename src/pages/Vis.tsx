import { getCodeByid, getSearchByid, getSubmissions } from '@/services/ant-design-pro/api';
import { curIdStore } from '@/stores/stu';
import { Scatter } from '@ant-design/charts';
import { langs } from '@uiw/codemirror-extensions-langs';
import { monokaiInit } from '@uiw/codemirror-theme-monokai';
import CodeMirror from '@uiw/react-codemirror';
import { Descriptions, message } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const DemoColumn: React.FC = () => {
  const [data, setData] = useState(null); // 初始化数据状态为null
  const [stu_data, setStuData] = useState(null); // 初始化数据状态为null
  const [code, setCode] = useState(null); // 初始化数据状态为null
  const [sId, setsId] = useState(null); // 初始化数据状态为null
  const [sName, setsName] = useState(null); // 初始化数据状态为null
  const [isLoading, setIsLoading] = useState(true); // 添加一个状态来追踪数据是否正在加载

  // 假设getSubmissions是一个返回Promise的异步函数
  const fetchData = async () => {
    try {
      const result = await getSubmissions();
      console.log(result);
      setData(result); // 设置数据状态
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // 无论成功还是失败，都设置加载状态为false
    }
  };

  const getReasearch = async (id) => {
    try {
      console.log('sid', id);
      const result = await getSearchByid(id);
      console.log('result', result);
      if (result.status === 'ok') {
        setStuData(result.submissions);
      } else message.error('未找到Code，请重新输入！');
    } catch (error) {
      console.error('Error fetching code:', error);
    }
  };

  const getCode = async (id) => {
    try {
      const result = await getCodeByid(id);
      console.log('code', result.content);
      if (result.status === 'ok') {
        setCode(result.content);
        setsId(result.sId);
        setsName(result.sName);
        await getReasearch(result.sId);
      } else message.error('未找到，请重新输入！');
    } catch (error) {
      console.error('Error fetching code:', error);
    } finally {
      setIsLoading(false); // 无论成功还是失败，都设置加载状态为false
    }
  };

  const getStuCode = async (id) => {
    try {
      const result = await getCodeByid(id);
      console.log('code', result.content);
      if (result.status === 'ok') {
        setCode(result.content);
      } else message.error('未找到，请重新输入！');
    } catch (error) {
      console.error('Error fetching code:', error);
    } finally {
      setIsLoading(false); // 无论成功还是失败，都设置加载状态为false
    }
  };

  useEffect(() => {
    fetchData(); // 在组件挂载时调用fetchData函数
  }, []); // 空数组表示这个effect只在组件挂载和卸载时运行一次

  if (isLoading) {
    return <div>Loading...</div>; // 数据加载时显示加载提示
  }

  if (!data) {
    return <div>Error loading data</div>; // 如果数据为空（可能是获取失败），显示错误提示
  }

  const config1 = {
    data,
    appendPadding: 10,
    height: 500,
    xField: 'x',
    yField: 'y',
    color: ({ x }) => {
      if (x === curIdStore.x_cur) {
        return 'green';
      }
      if (x === 100) {
        return 'red';
      }
      return 'blue';
    },
    shape: ({ x }) => {
      if (x === curIdStore.x_cur) {
        return 'square';
      }
      return 'circle';
    },
    size: 4,
    yAxis: {
      nice: true,
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
    xAxis: {
      min: 0,
      max: 100,
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
  };

  const config2 = {
    data: stu_data,
    appendPadding: 10,
    height: 500,
    xField: 'x',
    yField: 'y',
    color: ({ x }) => {
      if (x === curIdStore.x_cur) {
        return 'green';
      }
      if (x === 100) {
        return 'red';
      }
      return 'blue';
    },
    shape: ({ x }) => {
      if (x === curIdStore.x_cur) {
        return 'square';
      }
      return 'circle';
    },
    size: 4,
    yAxis: {
      nice: true,
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
    xAxis: {
      min: 0,
      max: 100,
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
  };

  return (
    <>
      <Scatter
        {...config1}
        onReady={(plot) => {
          plot.on('plot:click', (evt) => {
            if (evt?.data?.data) {
              console.log(evt.data.data);
              getCode(evt.data.data.id);
            }
          });
        }}
      />
      {sId ? (
        <Descriptions title="User Info" bordered layout="vertical" style={{ marginBottom: '40px' }}>
          <Descriptions.Item label="学生ID">{sId ? sId : ' '}</Descriptions.Item>
          <Descriptions.Item label="学生姓名">{sName ? sName : ' '}</Descriptions.Item>
        </Descriptions>
      ) : (
        <></>
      )}
      {stu_data ? (
        <Scatter
          {...config2}
          onReady={(plot) => {
            plot.on('plot:click', (evt) => {
              if (evt?.data?.data) {
                console.log(evt.data.data);
                getStuCode(evt.data.data.id);
              }
            });
          }}
        />
      ) : (
        <></>
      )}
      {code ? (
        <CodeMirror
          style={{ marginTop: '20px' }}
          value={code ? code : '暂时没有'}
          height="500px"
          electricChars="true"
          readOnly
          extensions={[langs.cpp()]}
          theme={monokaiInit({
            settings: {
              caret: '#c6c6c6',
              fontFamily: 'monospace',
            },
          })}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default observer(DemoColumn);
