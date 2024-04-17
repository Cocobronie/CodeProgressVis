import { getCodeByid, getSubmissions } from '@/services/ant-design-pro/api';
import { Scatter } from '@ant-design/charts';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const DemoColumn: React.FC = () => {
  const [data, setData] = useState(null); // 初始化数据状态为null
  const [code, setCode] = useState(null); // 初始化数据状态为null
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

  const getCode = async (id) => {
    try {
      const result = await getCodeByid(id);
      console.log('code', result);
      setCode(result.replace(/\n/g, '<br />')); // 设置数据状态
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

  const config = {
    data,
    appendPadding: 10,
    height: 500,
    xField: 'x',
    yField: 'y',
    // label: {
    //     position: 'middle',
    //     style: {
    //         fill: '#FFFFFF',
    //         opacity: 0.6,
    //     },
    // },
    // meta: {
    //     x: { alias: '进度' },
    //     y: { alias: '解决方案' },
    // },
    shape: 'circle',
    colorField: 'x', // 部分图表使用 seriesField
    color: ({ x }) => {
      if (x === 100) {
        return 'red';
      }
      return 'blue';
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
        {...config}
        onReady={(plot) => {
          plot.on('plot:click', (evt) => {
            // const { x, y } = evt;
            // const { xField } = plot.options;
            // const tooltipData = plot.chart.getTooltipItems({ x, y });
            // console.log(tooltipData[0].data);
            console.log(evt.data.data);
            getCode(evt.data.data.id);
          });
        }}
      />
      <Typography dangerouslySetInnerHTML={{ __html: code ? code : '暂时没有' }} />
    </>
  );
};

export default DemoColumn;