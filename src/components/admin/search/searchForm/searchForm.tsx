import React, { Fragment,memo} from "react"; 
import moment from "dayjs";
import useLazy from "@/hooks/useLazy";
import { SearchPanelInterface,SearchFormProps} from "@/interface/admin";

import {
  Button,
  Input,
  InputNumber,
  AutoComplete,
  Select,
  message,
  DatePicker,
  TreeSelect,
  Switch,
  Cascader,
  TimePicker,
  Form
} from "antd";
import { SearchOutlined } from '@ant-design/icons'
import { FormInstance} from "antd/es/form";
import useFormInstance from "antd/lib/form/hooks/useFormInstance";
import { render } from "react-dom";

const FormItem = Form.Item;
const ref = React.useRef
const { Option } = Select;
const { TreeNode } = TreeSelect;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
