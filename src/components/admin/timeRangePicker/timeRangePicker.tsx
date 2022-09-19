/**
 * 引入該有一定的順序規則
 * 库--組件/本地組件--本地utils--前置变量let/const--当前组件/页面
 * 如果有别名，别名的引入要在相对路径之前，如：'@/utils'要在'./utils'之前
 */

/** 库 */
import React, { memo, Fragment, useState } from "react";
import  moment from "dayjs";
import { PickerPanel,TimeRangeParams } from '@/interface/admin'
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
/** 组件 */
import { message } from "antd";
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
/** 前置变量--let/const */
// const nowTime()[0] = moment().hours();
// const nowTime()[1] = moment().minutes();
// const nowTime()[2] = moment().seconds();
const TimePicker = generatePicker<moment.Dayjs>(dayjsGenerateConfig);
const nowTime = () => {
  // 必须实时调用，否则时间不准确
  return [
    moment().hour(), // 当前小时数
    moment().minute() + 1, // 当前分钟数(如果不+1，当前分钟也可以选，但+1后面的秒数禁用也就没意义了，按需取用)
    moment().second() // 当前秒数
  ];
};
const today = moment().format("YYYY-MM-DD");
const initTimeRange:TimeRangeParams = {
  /** 时间段列表--默认值，有id是为了增删时所用 */
  id: 0,
  startTime: "00:00:00",
  endTime: "00:00:00"
};

export function Picker({
  showTip /** 时间不符合的时候是否给提示，可以为Boolean或者string或者{text,duration,end()}三种格式 */,
  format = "HH:mm" /** formart格式，默认HH:mm，可以设为HH:mm:ss等时分秒格式 */,
  disabledNow /** 是否禁用小于当前时间的其他时间--控件在选择小时之后仍然会默认选中分钟00 */,
  disabledHours /** 禁用的小时数，格式为0-23的number数组，优先级比disabledNow高 */,
  disabledMinutes /** 禁用的分钟数，格式为0-59的number数组，优先级比disabledNow高 */,
  disabledSeconds /** 禁用的秒数，格式为0-59的number数组，优先级比disabledNow高 */,
  timeRange = initTimeRange /** 时间段--json，id/startTime/endTime都必传 */,
  permission /** 返回当前组件的区间值是否合法--false是开始时间大于结束时间，可用于禁止页面其他关联的操作 */,
  getRangeTime /** 获取当前时间段，以及开始/结束时间差的permission */,
  ...props /** 继承官方组件（不止）其他属性 */
}:PickerPanel) {
  const [thisTimeRange, setTimeRange] = useState(timeRange);
  /** 获取前后时间段对照 */
  const getTimeRangeState = (status:any|null, str:any|null) => {
    const timeObj = { ...thisTimeRange };
    if (!timeObj.startTime || !timeObj.endTime) {
      return false;
    }
    let isOk = true;

    let startHour = moment(`${today} ${timeObj.startTime}`).hour();
    let startMinute = moment(`${today} ${timeObj.startTime}`).minute();
    let startSeconds = moment(`${today} ${timeObj.startTime}`).second();
    let endHour = moment(`${today} ${timeObj.endTime}`).hour();
    let endMinute = moment(`${today} ${timeObj.endTime}`).minute();
    let endSeconds = moment(`${today} ${timeObj.endTime}`).second();

    if (status === "startTime") {
      /** 开始时间的 小时数 和 分钟数 */
      startHour = str ? moment(`${today} ${str}`).hour() : 0;
      startMinute = str ? moment(`${today} ${str}`).minute() : 0;
      startSeconds = str ? moment(`${today} ${str}`).second() : 0;
    }

    if (status === "endTime") {
      /** 结束时间的 小时数 和 分钟数 */
      endHour = str ? moment(`${today} ${str}`).hour() : 0;
      endMinute = str ? moment(`${today} ${str}`).minute() : 0;
      endSeconds = str ? moment(`${today} ${str}`).second() : 0;
    }

    const numHour = startHour - endHour;
    const numMin = startMinute - endMinute;
    const numSeconds = startSeconds - endSeconds;

    if (
      numHour > 0 ||
      (numHour === 0 && numMin > 0) ||
      (numHour === 0 && numMin === 0 && numSeconds >= 0)
    ) {
      // 开始hour·大于·结束hour
      // 开始hour·等于·结束hour 并且 开始minute·大于·结束minute
      isOk = false;
    }

    /** 避免页面上出现多个message先销毁 */
    if (!isOk) {
      permission && permission(false);
      if ((status === "startTime" && timeObj.endTime) || status === "endTime") {
        const duration = 1.5;
        let text = "结束时间必须大于开始时间";
        if (showTip && typeof showTip === "string") {
          text = showTip;
        }
        if (showTip && typeof showTip === "object") {
          showTip.end && showTip.end();
        }
        showTip &&
          message.error(
            showTip.text || text,
            (showTip && showTip.duration) || duration
          );
      }
    } else {
      message.destroy();
      permission && permission(true);
    }
    return isOk;
  };

  /** 时间改变 */
  const onTimeChange = (time:any, str:any, status:any) => {
    /** time值不取用，因为当前"antd": "^3.13.0"的此控件有bug */
    const timeArr = str.split(":") || [];
    const maxHour = timeArr.length > 0 ? timeArr[0] : 0;
    const maxMinute = timeArr.length > 1 ? timeArr[1] : 0;
    const obj = { ...thisTimeRange };
    obj[status] = str;

    setTimeRange(obj);
    if (str) {
      const can = getTimeRangeState(status, str);
      getRangeTime && getRangeTime(obj, can);
    } else {
      getRangeTime && getRangeTime(obj);
    }
  };

  /** 时间面板开启/关闭事件 */
  const onOpenChange = (flag:any) => {
    if (!flag /** 关闭 */) {
      getTimeRangeState(null,null);
    }
  };

  /** 禁用starthours */
  const getStartDisabledHours = () => {
    let noHours = []; // allHours
    for (let i = 0; i < +nowTime()[0]; i += 1) {
      noHours.push(i);
    }
    if (disabledNow) {
      noHours = disabledHours || noHours;
    } else {
      noHours = disabledHours || [];
    }
    return noHours;
  };

  /** 禁用startminutes  */
  const getStartDisabledMinutes = (selectedHour:number) /** 被选中的hour */ => {
    let minutes = [];
    if (selectedHour === +nowTime()[0]) {
      for (let i = 0; i < +nowTime()[1]; i += 1) {
        minutes.push(i);
      }
    }
    if (disabledNow) {
      minutes = disabledMinutes || minutes;
    } else {
      minutes = disabledMinutes || [];
    }

    return minutes;
  };

  const getStartDisabledSeconds = (selectedHour:number, selectedMinute:number) => {
    let seconds = [];
    if (selectedHour === +nowTime()[0] && selectedMinute === +nowTime()[1]) {
      for (let i = 0; i < +nowTime()[2]; i += 1) {
        seconds.push(i);
      }
    }
    if (disabledNow) {
      seconds = disabledSeconds || seconds;
    } else {
      seconds = disabledSeconds || [];
    }

    return seconds;
  };

  return (
    <Fragment>
      <TimePicker
        {...props}
        format={format}
        defaultValue={
          thisTimeRange.startTime
            ? moment(thisTimeRange.startTime, format)
            : undefined
        }
        disabledHours={() => getStartDisabledHours()}
        disabledMinutes={(e:any) => getStartDisabledMinutes(e)}
        onOpenChange={() => onOpenChange("startTime")}
        onChange={(e:any, str:any) => onTimeChange(e, str, "startTime")}
      ></TimePicker>

      <TimePicker
        {...props}
        format={format}
        defaultValue={
          thisTimeRange.endTime ? moment(thisTimeRange.endTime, format) : undefined
        }
        disabledHours={() => getStartDisabledHours()}
        disabledMinutes={(e:any) => getStartDisabledMinutes(e)}
        // disabledSeconds={(h:any, m:any) => getStartDisabledSeconds(h, m)}
        onOpenChange={() => onOpenChange("endTime")}
        onChange={(e, str) => onTimeChange(e, str, "endTime")}
        style={{ margin: "0 10px" }}
      />
    </Fragment>
  );
}
const TimeRangePicker = Picker
export default memo(TimeRangePicker);