import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Image, theme } from 'antd';
import React from 'react';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage: "url('/csu.jpg')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 CodeProgressVis - 学生代码进度可视化平台
          </div>
          <p
            style={{
              fontSize: '20px',
              color: token.colorTextSecondary,
              lineHeight: '45px',
              marginTop: 25,
              marginBottom: 32,
              width: '75%',
            }}
          >
            学生提交的代码以2D地图的形式展示，可视化分为两个维度，分别是班级维度和个人维度。
            <br />
            横纵坐标分别表示问题解决进度以及解决方案种类。
            <br />
            通过班级维度的2D地图，导师可以识别进度较慢的学生。
            <br />
            除此之外导师还可以通过搜索学生ID查看学生的编码地图，从而判断该学生的进度。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          ></div>
        </div>
        <Image
          // style={{ marginLeft: '400px' }}
          width={500}
          src="/welcome_01.png"
        />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
