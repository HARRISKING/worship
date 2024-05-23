import Rules from './options';

export type ValidatorType =
  | 'name'
  | 'ipcName'
  | 'origin'
  | 'address'
  | 'url'
  | 'password'
  | 'remark'
  | 'phone'
  | 'specialPlane'
  | 'bankCard'
  | 'ip'
  | 'mac'
  | 'idCard'
  | 'email';
export interface IValidator {
  required: boolean;
  name?: string;
  min?: number;
  max?: number;
  regex?: RegExp;
  tip?: string; // 提示格式错误
}

/**
 * 校验器
 *
 * @remarks
 * ```
 * "name": 名称
 * "ipcName": IPC用户名
 * "origin": 籍贯
 * "address": 地址
 * "url": URL地址
 * "password": 密码
 * "remark": 备注
 * "phone": 手机号
 * "specialPlane": 座机号
 * "bankCard": 银行卡
 * "ip": IP地址
 * "mac": MAC地址
 * "idCard": 身份证号
 * "email": 邮箱
 * @public
 */

export interface Result {
  key: string;
  message?: string;
  success: boolean;
}

interface CheckEmptyParams {
  value: any;
  key: string;
  name: string;
}
export const checkEmpty = (params: CheckEmptyParams): Result => {
  const { value, key, name } = params;
  let isEmpty = !value && value !== 0;
  isEmpty = Array.isArray(value) ? !value?.length : isEmpty;
  if (isEmpty) {
    return {
      key,
      success: false,
      message: `${name}不能为空`,
    };
  } else {
    return {
      success: true,
      key,
    };
  }
};

interface CheckLengthParams {
  value: any;
  key: string;
  name: string;
  min?: number;
  max?: number;
}
export const checkLength = (params: CheckLengthParams): Result => {
  const { value, key, name, min, max } = params;
  const { length } = value;
  let message = '';
  if (min && !max && length < min) {
    message = `${name}不得小于${min}位`;
  } else if (max && !min && length > max) {
    message = `${name}不得大于${max}位`;
  } else if (max && min && (max < length || min > length)) {
    message =
      min !== max ? `${name}应为${min}-${max}位` : `${name}应为${min}位`;
  }
  return {
    success: !message,
    message,
    key,
  };
};

interface CheckRegexParams {
  value: any;
  key: string;
  name: string;
  regex: RegExp;
  tip?: string; // 提示格式错误
}
export const checkRegex = (params: CheckRegexParams): Result => {
  const { value, key, name, regex, tip } = params;
  if (!regex.test(value)) {
    return {
      key,
      success: false,
      message: tip || `${name}格式错误`,
    };
  } else {
    return {
      success: true,
      key,
    };
  }
};

export const getRuleByType = (type: ValidatorType) => {
  return Rules[type];
};

export interface CheckParams {
  value: any; // 字段值
  rule: IValidator & { name: string }; // 校验规则
  key: string; // 字段名
}

/**
 * 校验函数
 * @param params
 * 返回错误结果
 * 校验顺序：非空 -> 长度 -> 正则；不通过就抛出结果
 * 输出单个规则的错误结果
 * 校验通过返回undefined
 */

export const checkByRule = (params: CheckParams): Result | undefined => {
  const { rule, ...base } = params;
  const { name, min, max, required, regex, tip } = rule;
  const results: Result[] = [];
  required && results.push(checkEmpty({ name, ...base }));
  if (base.value) {
    results.every((r) => r.success) &&
      (min || max) &&
      results.push(checkLength({ name, min, max, ...base }));
    results.every((r) => r.success) &&
      regex &&
      results.push(checkRegex({ name, regex, tip, ...base }));
  }
  return results.filter((r) => !r.success)[0];
};
