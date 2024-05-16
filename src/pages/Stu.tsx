import { submit } from '@/services/ant-design-pro/api';
import { curIdStore } from '@/stores/stu';
import { langs } from '@uiw/codemirror-extensions-langs';
import { monokaiInit } from '@uiw/codemirror-theme-monokai';
import CodeMirror from '@uiw/react-codemirror';
import { Button, Descriptions, Flex, message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

const DemoColumn: React.FC = () => {
  const [code, setCode] = useState('');

  // 点击按钮提交
  const submitClick = async () => {
    console.log('code', code);
    const sId = '820';
    const sName = '孙希婷';
    try {
      // 登录
      const msg = await submit(code, sId, sName);
      if (msg.status === 'ok') {
        console.log(msg);
        message.success('提交成功！');
        curIdStore.update(msg.x_Field);
        console.log('cur_x', curIdStore.x_cur);
        return;
      }
      console.log(msg);
    } catch (error) {
      console.log(error);
      message.error('提交失败，请重试！');
    }
  };

  const debouncedOnChange = _.debounce((editor) => {
    console.log('editor', editor);
    setCode(editor);
  }, 2000); // 2秒的延迟

  return (
    <>
      {/* leecode 题目链接：https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array */}
      {/* <Typography {{34. 在排序数组中查找元素的第一个和最后一个位置}} /> */}
      <Title level={3}>34. 在排序数组中查找元素的第一个和最后一个位置</Title>
      <Paragraph>
        <pre>
          给你一个按照非递减顺序排列的整数数组 nums，和一个目标值
          target。请你找出给定目标值在数组中的开始位置和结束位置。
          <br />
          如果数组中不存在目标值 target，返回 [-1, -1]。
          <br />
          你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
        </pre>

        {/* 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

                如果数组中不存在目标值 target，返回 [-1, -1]。

                你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。 */}
      </Paragraph>
      <Descriptions title="User Info" bordered layout="vertical" style={{ marginBottom: '40px' }}>
        <Descriptions.Item label="学生ID">820</Descriptions.Item>
        <Descriptions.Item label="学生姓名">孙希婷</Descriptions.Item>
      </Descriptions>

      <CodeMirror
        value={code}
        height="500px"
        electricChars="true"
        extensions={[langs.cpp()]}
        spellcheck="true"
        matchBrackets="true"
        theme={monokaiInit({
          settings: {
            caret: '#c6c6c6',
            fontFamily: 'monospace',
          },
        })}
        onChange={debouncedOnChange}
      />
      <Flex justify="flex-end" style={{ margin: '15px' }}>
        <Button type="primary" size="large" onClick={submitClick}>
          提交
        </Button>
      </Flex>
    </>
  );
};

export default observer(DemoColumn);
