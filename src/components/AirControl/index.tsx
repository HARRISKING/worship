import { Canvas, Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';

import './index.scss';

const prefix = 'c-air-control';

interface IProgressProps {
  id: string;
  value: number | string | React.ReactNode;
  completePercent: number;
  color?: string;
  gradientColor1?: string;
  gradientColor2?: string;
}

const Progress: React.FunctionComponent<IProgressProps> = ({
  id = 'c-air-control',
  value,
  completePercent = 0,
  color,
  gradientColor1,
  gradientColor2,
}) => {
  const [imgUrl, setImgUrl] = useState<string>();
  const draw = (ctx: any, res) => {
    // 计算结束角度
    const startAngle = Math.PI * 0.75;
    const endAngle = startAngle + 1.5 * Math.PI * completePercent;

    const x = res[0].width / 2;
    const y = res[0].height / 2;
    const radius = Math.min(x, y) * 0.9;

    // 设定曲线粗细度
    ctx.lineWidth = 10;
    // 连接处样式
    ctx.lineCap = 'round';
    // 开始绘制
    ctx.beginPath();
    // 绘制曲线
    ctx.arc(x, y, radius, startAngle, Math.PI * 0.25, false);
    // 给曲线着色
    ctx.strokeStyle = color;

    // 给环着色
    ctx.stroke();
    ctx.closePath();

    // 绘制内环
    ctx.beginPath();
    // 绘制曲线
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    // 给曲线着色
    // /创建渐变，参数分别为：渐变起点x坐标、渐变起点y坐标、渐变终点x坐标、渐变终点y坐标
    const gradient = ctx.createLinearGradient(x, y - radius, x, y + radius); // 从上至下的渐变
    gradient.addColorStop(0, gradientColor1); // 渐变开始颜色
    gradient.addColorStop(1, gradientColor2); // 渐变结束颜色
    ctx.strokeStyle = gradient; // 设置描边样式为渐变
    // 给环着色
    ctx.stroke();
    ctx.closePath();
    drawLine(ctx, x, y, radius);
    drawActionPoint(ctx, x, y, radius);
  };

  // 绘制刻度线
  const drawLine = (ctx, x, y, radius) => {
    const lineRdius = radius - 20;
    const marks = 15; // 总刻度数 （这里设为每6度一个刻度）
    ctx.lineWidth = 1; // 刻度线宽度
    const tickLength = 1; // 刻度线的长度
    ctx.beginPath();
    // 创建半圆刻度线
    for (let i = 0; i <= marks; i++) {
      const pi = -(0.83 - i / marks) * 1.5;
      const angle = pi * Math.PI;
      // 刻度开始点
      const startX = x + lineRdius * Math.cos(angle);
      const startY = y + lineRdius * Math.sin(angle);

      // 刻度结束点
      const endX = x + (lineRdius + tickLength) * Math.cos(angle);
      const endY = y + (lineRdius + tickLength) * Math.sin(angle);

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
    }
    ctx.strokeStyle = '#848484'; // 刻度线颜色
    ctx.stroke();
    ctx.closePath();
  };

  // 绘制圆点
  const drawActionPoint = (ctx, x, y, radius) => {
    const startAngle = Math.PI * 0.75;
    const endAngle = startAngle + 1.5 * Math.PI * completePercent;
    const endX = x + radius * Math.cos(endAngle);
    const endY = y + radius * Math.sin(endAngle);
    // 设置阴影的模糊度
    ctx.shadowBlur = 5;
    // 设置阴影的颜色
    ctx.shadowColor = '#E5E7E9';
    // 设置阴影的偏移量
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(endX, endY, 15, 0, 2 * Math.PI);
    ctx.fill(); // 填充颜色
    ctx.closePath();
    // 绘制内圆
    ctx.fillStyle = '#31C5EE';
    ctx.beginPath();
    ctx.arc(endX, endY, 10, 0, 2 * Math.PI);
    ctx.fill(); // 填充颜色
    ctx.closePath();
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setTimeout(() => {
      const getCanvas = Taro.createSelectorQuery();
      const info = Taro.getSystemInfoSync();
      // 解决移动端模糊问题
      const dpr = info.pixelRatio;
      getCanvas
        .select(`#${id}`)
        .fields({ node: true, size: true })
        .exec(async (res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          ctx.scale(dpr, dpr);
          draw(ctx, res);
          setTimeout(() => {
            saveCanvasToUrl(canvas);
          }, 1000);
        });
    }, 300);
  }, [id, completePercent]);

  const saveCanvasToUrl = (canvas) => {
    const filePath = canvas.toDataURL();
    setImgUrl(filePath);
  };

  return (
    <View className={`${prefix}`}>
      {imgUrl ? (
        <Image src={imgUrl} className={`${prefix}-canvas`} />
      ) : (
        <Canvas
          id={id}
          canvasId={id}
          type="2d"
          className={`${prefix}-canvas`}
          disableScroll={false}
        />
      )}
      <View className={`${prefix}-fraction`}>
        {value}
        <Text className={`${prefix}-fraction-c`}>℃</Text>
      </View>
      <View className={`${prefix}-range`}>
        <Text>16℃</Text>
        <Text>32℃</Text>
      </View>
    </View>
  );
};

export default Progress;
