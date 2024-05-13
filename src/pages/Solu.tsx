import { getCodeByid, getSearchByid } from '@/services/ant-design-pro/api';
import { curIdStore } from '@/stores/stu';
import { Scatter } from '@ant-design/charts';
import { langs } from '@uiw/codemirror-extensions-langs';
import { monokaiInit } from '@uiw/codemirror-theme-monokai';
import CodeMirror from '@uiw/react-codemirror';
import { Descriptions, message } from 'antd';
import Search, { SearchProps } from 'antd/lib/input/Search';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

const DemoColumn: React.FC = () => {
  // const [codeList, setCodeList] = useState([]); // 初始化数据状态为null
  const [sId, setsId] = useState(null); // 初始化数据状态为null
  const [sName, setsName] = useState(null); // 初始化数据状态为null
  const [data, setData] = useState(null); // 初始化数据状态为null
  const [code, setCode] = useState(null); // 初始化数据状态为null

  const getReasearch = async (id) => {
    try {
      const result = await getSearchByid(id);
      console.log('result', result);
      if (result.status === 'ok') {
        setCodeList(result.content_list);
        setsId(result.sId);
        setsName(result.sName);
        setData(result.submissions);
      } else message.error('未找到，请重新输入！');
    } catch (error) {
      console.error('Error fetching code:', error);
    }
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    getReasearch(value);
  };

  const getCode = async (id) => {
    try {
      const result = await getCodeByid(id);
      console.log('code', result.content);
      if (result.status === 'ok') {
        setCode(result.content);
        setsId(result.sId);
        setsName(result.sName);
      } else message.error('未找到，请重新输入！');
    } catch (error) {
      console.error('Error fetching code:', error);
    }
  };

  const config = {
    data,
    appendPadding: 10,
    height: 500,
    xField: 'x',
    yField: 'y',
    color: ({ x }) => {
      if (x === curIdStore.x_cur) {
        console.log('图标' + x);
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
      <Search placeholder="输入学生ID... " onSearch={onSearch} enterButton />
      {sId ? (
        <Descriptions
          title="User Info"
          bordered
          layout="vertical"
          style={{ marginBottom: '40px', marginTop: '15px' }}
        >
          <Descriptions.Item label="学生ID">{sId ? sId : ' '}</Descriptions.Item>
          <Descriptions.Item label="学生姓名">{sName ? sName : ' '}</Descriptions.Item>
        </Descriptions>
      ) : (
        <></>
      )}
      {data ? (
        <Scatter
          {...config}
          onReady={(plot) => {
            plot.on('plot:click', (evt) => {
              if (evt?.data?.data) {
                console.log(evt.data.data);
                getCode(evt.data.data.id);
              }
            });
          }}
        />
      ) : (
        <></>
      )}
      {/* {codeList ? codeList.map((code) => (
        <CodeMirror
          value={code ? code : '暂时没有'}
          style={{ marginTop: '15px' }}
          height="500px"
          electricChars="true"
          readOnly
          extensions={[langs.cpp()]}
          theme={
            monokaiInit({
              settings: {
                caret: '#c6c6c6',
                fontFamily: 'monospace',
              },
            })
          }
        />
      )) : (
        <></>
      )} */}
      {code ? (
        <CodeMirror
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
