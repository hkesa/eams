import { ColumnDefinition } from './types';

// Define the widths
const REMARK_WIDTH = '270px'; 
const ADDRESS_WIDTH = '270px'; // 1.5x of 180px
const STD_WIDTH = '180px';

// Option Lists
const GENDER_OPTIONS = ['男', '女'];
const NATIONALITY_OPTIONS = ['印尼', '菲律賓'];
const APP_TYPE_OPTIONS = [
    '內續約 (我們)', '外續約 (直聘)', '死亡 (在港)', '移民 (在港)', 
    '財政 (在港)', '完約 (在港)', '斷約轉完約 (在港)', '斷約轉海外', 
    '完約轉海外', '我們海外', '學校海外', '直聘海外', 
    '直聘完約轉海外', '直聘斷約轉海外', '直聘死亡 (在港)', '直聘移民 (在港)', 
    '直聘財政 (在港)', '直聘完約 (在港)', '直聘斷約轉完約 (在港)'
];
const PAYMENT_STATUS_OPTIONS = ['等待付款', '等待查核', '只付部分', '全部已付'];
const PAYMENT_METHOD_OPTIONS = ['更換', '現金', '公司中銀', '公司中銀支票', '公司PayMe', '個人滙豐', '其他'];
const INSURANCE_OPTIONS = ['僱主買', '經公司買', '公司舊保險轉名'];
const CHECKUP_OPTIONS = ['無', '已包括', '額外買', '已包括普通+額外再買'];
const SCHOOL_PAY_OPTIONS = ['現金', '公司中銀', '公司中銀支票', '公司PayMe', '個人滙豐', '支付寶', '微信支付', '其他'];
const AGENCY_PAY_OPTIONS = ['現金', '公司中銀', '公司中銀支票', '公司PayMe', '個人滙豐', '支付寶', '微信支付', '其他'];
const EMP_NATIONALITY_OPTIONS = ['香港', '內地', '台灣', '日本', '韓國', '新加坡', '馬來西亞', '其他'];
const FIRST_HIRE_OPTIONS = ['首次', '更換', '增聘', '續約'];
const SOURCE_OPTIONS = ['HelloToby', 'Facebook', 'Google', 'YouTube', '回頭客', '內續約', '外續約', '僱主新外傭介紹', '舊外傭介紹', '舊客介紹', '街客', '其他'];
const HELPER_SOURCE_OPTIONS = ['回頭傭', 'HelperChoice', 'Facebook', '舊外傭介紹', '內續約', '外續約', '直聘', '學校', '蛇頭', '其他'];
const APP_STATUS_OPTIONS = ['辦理中', '已完成', '已退款', '已取消', '其他'];


export const FILE_COLUMNS: ColumnDefinition[] = [
  // Sticky Columns
  { key: 'id', label: '檔案編號', type: 'text', width: '120px' },
  { key: 'empNameChi', label: '僱主中文名', type: 'text', width: '130px' },
  
  // 服務協議區
  { key: 'empNameEng', label: '僱主英文名', type: 'text', width: STD_WIDTH },
  { key: 'empId', label: '僱主身份證號碼', type: 'text', width: STD_WIDTH },
  { key: 'empNo', label: '僱主編號', type: 'text', width: STD_WIDTH },
  { key: 'contactGender', label: '聯絡人性別', type: 'select', options: GENDER_OPTIONS, width: STD_WIDTH },
  { key: 'helperNo', label: '外傭編號', type: 'text', width: STD_WIDTH }, // Moved here
  { key: 'helperName', label: '外傭全名', type: 'text', width: STD_WIDTH },
  { key: 'helperId', label: '外傭身份證號碼', type: 'text', width: STD_WIDTH },
  { key: 'helperPassport', label: '外傭護照號碼', type: 'text', width: STD_WIDTH },
  { key: 'helperNationality', label: '外傭國籍', type: 'select', options: NATIONALITY_OPTIONS, width: STD_WIDTH },
  { key: 'helperType', label: '申請類別', type: 'select', options: APP_TYPE_OPTIONS, width: '220px' },
  { key: 'agreementRemark', label: '協議備註 (如有)', type: 'text', width: REMARK_WIDTH }, 

  // 簽約區
  { key: 'branch', label: '負責分店', type: 'text', width: STD_WIDTH },
  { key: 'staff', label: '負責同事', type: 'text', width: STD_WIDTH },
  { key: 'inquiryDate', label: '查詢日期', type: 'date', width: STD_WIDTH },
  { key: 'signDate', label: '簽約日期', type: 'date', width: STD_WIDTH },
  { key: 'signDaysDiff', label: '簽約相隔日數⚡', type: 'number', width: STD_WIDTH }, // Auto calc
  { key: 'signAmount', label: '簽約金額', type: 'number', width: STD_WIDTH },

  // 顧客付款區
  { key: 'receiptNo', label: '收據編號', type: 'text', width: STD_WIDTH },
  { key: 'paymentStatus', label: '付款狀態', type: 'select', options: PAYMENT_STATUS_OPTIONS, width: STD_WIDTH }, // Moved here
  { key: 'paymentDate', label: '付款日期', type: 'date', width: STD_WIDTH },
  { key: 'paymentMethod', label: '付款方式', type: 'select', options: PAYMENT_METHOD_OPTIONS, width: STD_WIDTH },
  { key: 'hasInsurance', label: '買保險', type: 'select', options: INSURANCE_OPTIONS, width: STD_WIDTH },
  { key: 'hasCheckup', label: '買香港驗身', type: 'select', options: CHECKUP_OPTIONS, width: STD_WIDTH },
  { key: 'originalPrice', label: '原價', type: 'number', width: STD_WIDTH },
  { key: 'actualPrice', label: '實收金額', type: 'number', width: STD_WIDTH },
  { key: 'profit', label: '純利', type: 'number', width: STD_WIDTH },
  { key: 'customerRemark', label: '付款備註 (如有)', type: 'text', width: REMARK_WIDTH }, 

  // 學校付款區
  { key: 'schoolNo', label: '學校編號', type: 'text', width: STD_WIDTH },
  { key: 'schoolName', label: '學校名稱', type: 'text', width: STD_WIDTH },
  { key: 'schoolPayDate', label: '學校付款日期', type: 'date', width: STD_WIDTH },
  { key: 'schoolPayMethod', label: '學校付款方式', type: 'select', options: SCHOOL_PAY_OPTIONS, width: STD_WIDTH },
  { key: 'schoolAmount', label: '學校付款金額', type: 'number', width: STD_WIDTH },
  { key: 'schoolRemark', label: '學校備註 (如有)', type: 'text', width: REMARK_WIDTH }, 

  // 大牌付款區
  { key: 'agencyNo', label: '大牌編號', type: 'text', width: STD_WIDTH },
  { key: 'agencyName', label: '大牌名稱', type: 'text', width: STD_WIDTH },
  { key: 'agencyContractDate', label: '交合約給大牌日期', type: 'date', width: STD_WIDTH },
  { key: 'agencyPayDate', label: '大牌付款日期', type: 'date', width: STD_WIDTH },
  { key: 'agencyPayMethod', label: '大牌付款方式', type: 'select', options: AGENCY_PAY_OPTIONS, width: STD_WIDTH },
  { key: 'agencyAmount', label: '大牌付款金額', type: 'number', width: STD_WIDTH },
  { key: 'agencyRemark', label: '大牌備註 (如有)', type: 'text', width: REMARK_WIDTH }, 

  // 香港申請進度區
  { key: 'consulateSubmitDate', label: '領事館遞交日期', type: 'date', width: STD_WIDTH },
  { key: 'consulateApproveDate', label: '領事館批出日期', type: 'date', width: STD_WIDTH },
  { key: 'consulateRemark', label: '領事館備註 (如有)', type: 'text', width: REMARK_WIDTH }, 
  { key: 'immSubmitDate', label: '入境處遞交日期', type: 'date', width: STD_WIDTH },
  { key: 'ackLetterDate', label: '確收信接收日期', type: 'date', width: STD_WIDTH },
  { key: 'suppLetterDate', label: '補交信接收日期', type: 'date', width: STD_WIDTH },
  { key: 'suppDocSubmitDate', label: '補交文件遞交日期', type: 'date', width: STD_WIDTH },
  { key: 'approveLetterDate', label: '批准信接收日期', type: 'date', width: STD_WIDTH },
  { key: 'visaPickupDate', label: '簽證領取日期', type: 'date', width: STD_WIDTH },
  { key: 'whoPickVisa', label: '誰取簽證', type: 'text', width: STD_WIDTH },
  { key: 'immRemark', label: '入境處備註 (如有)', type: 'text', width: REMARK_WIDTH }, 

  // 海外申請進度區
  { key: 'dhl1Remark', label: 'OCS／DHL 備註 (1)', type: 'text', width: REMARK_WIDTH },
  { key: 'dhl2Remark', label: 'OCS／DHL 備註 (2)', type: 'text', width: REMARK_WIDTH },
  { key: 'visaSendDate', label: '合約和簽證寄出日期', type: 'date', width: STD_WIDTH },
  { key: 'schoolFinishDate', label: '學校手續完成日期', type: 'date', width: STD_WIDTH },

  // 上班區
  { key: 'entryDate', label: '入境日期', type: 'date', width: STD_WIDTH },
  { key: 'visaStartDate', label: '簽證開始日', type: 'date', width: STD_WIDTH },
  { key: 'workStartDate', label: '真正上班日', type: 'date', width: STD_WIDTH },

  // 日子統計區
  { key: 'consulateDaysDiff', label: '領事館相隔日數⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'immDaysDiff', label: '入境處相隔日數⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'totalProcessDays', label: '香港整體⚡\n(領事館 至 新簽證)', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'schoolProcessDays', label: '學校辦理⚡\n(郵寄 至 可飛)', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'overseasProcessDays', label: '海外整體⚡\n(領事館 至 可飛)', type: 'number', width: STD_WIDTH }, // Auto

  // 到期日提醒區
  { key: 'renewalReminder', label: '新合約完約日', type: 'date', width: STD_WIDTH }, 
  { key: 'passportReminder', label: '護照有效期至', type: 'date', width: STD_WIDTH },
  { key: 'shortVisaReminder', label: '短日子計算⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'reminderType', label: '短日子類別⚡', type: 'text', width: STD_WIDTH }, // Auto

  // 兩年後回顧區
  { key: 'renewalNewFileNo', label: '如是續約/回頭客/回頭傭 (請填新檔案號碼)', type: 'text', width: '220px' },
  { key: 'visaStartDate2', label: '第一份合約開始日', type: 'date', width: STD_WIDTH },
  { key: 'terminateDate', label: '終止外傭日期', type: 'date', width: STD_WIDTH },
  { key: 'terminateDays', label: '終止相隔日數⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'terminateMonths', label: '終止相隔月數⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'terminateReason', label: '終止原因', type: 'text', width: REMARK_WIDTH },

  // 僱主資料區
  { key: 'employerGender', label: '僱主性別', type: 'select', options: GENDER_OPTIONS, width: STD_WIDTH },
  { key: 'employerNationality', label: '僱主國籍', type: 'select', options: EMP_NATIONALITY_OPTIONS, width: STD_WIDTH },
  { key: 'partnerName', label: '伴侶姓名', type: 'text', width: STD_WIDTH },
  { key: 'partnerPhone', label: '伴侶電話號碼', type: 'text', width: STD_WIDTH },
  { key: 'employerPhone', label: '僱主電話號碼', type: 'text', width: STD_WIDTH },
  { key: 'employerAddress', label: '僱主居住地址', type: 'text', width: ADDRESS_WIDTH }, // Wider
  { key: 'occupation', label: '職業', type: 'text', width: STD_WIDTH },
  { key: 'salary', label: '僱主月薪', type: 'number', width: STD_WIDTH },
  { key: 'dob', label: '僱主出生日期', type: 'date', width: STD_WIDTH },
  { key: 'ageAtHire', label: '僱主聘請時年齡⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'firstTimeHire', label: '人生第一次\n聘請外傭？', type: 'select', options: FIRST_HIRE_OPTIONS, width: STD_WIDTH },
  { key: 'helpersCount', label: '多少位外傭一起工作', type: 'number', width: STD_WIDTH },
  { key: 'source', label: '顧客如何得知我們', type: 'select', options: SOURCE_OPTIONS, width: STD_WIDTH },
  { key: 'prevFileNo', label: '顧客舊檔號 (如有)', type: 'text', width: STD_WIDTH },

  // 外傭資料區
  { key: 'helperPhone', label: '外傭電話號碼', type: 'text', width: STD_WIDTH },
  { key: 'helperSalary', label: '外傭合約月薪', type: 'number', width: STD_WIDTH },
  { key: 'helperAddress', label: '外傭家鄉地址', type: 'text', width: ADDRESS_WIDTH }, // Wider
  { key: 'helperDob', label: '外傭出生日期', type: 'date', width: STD_WIDTH },
  { key: 'helperAgeAtHire', label: '外傭被聘時年齡⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'ageDiff', label: '兩人相差歲數⚡', type: 'number', width: STD_WIDTH }, // Auto
  { key: 'contractNo', label: '合約號碼', type: 'text', width: STD_WIDTH },
  { key: 'commission', label: '佣金銀碼', type: 'number', width: STD_WIDTH }, // Renamed
  { key: 'helperReceiptNo', label: '外傭收據編號', type: 'text', width: STD_WIDTH },
  { key: 'commissionDate', label: '佣金日期', type: 'date', width: STD_WIDTH },
  { key: 'helperSource', label: '外傭如何得知我們', type: 'select', options: HELPER_SOURCE_OPTIONS, width: STD_WIDTH },
  { key: 'helperPrevFileNo', label: '外傭舊檔號 (如有)', type: 'text', width: STD_WIDTH },

  // 驗身區
  { key: 'checkupDate', label: '香港驗身日期', type: 'date', width: STD_WIDTH },
  { key: 'checkupMethod', label: '驗身方式或驗身券號碼', type: 'text', width: '220px' },

  // 備註區
  { key: 'employerRemark', label: '僱主備註', type: 'text', width: REMARK_WIDTH },
  { key: 'helperRemark', label: '外傭備註', type: 'text', width: REMARK_WIDTH },
  { key: 'companyRemark', label: '公司備註', type: 'text', width: REMARK_WIDTH },
  { key: 'applicationStatus', label: '申請狀態', type: 'select', options: APP_STATUS_OPTIONS, width: STD_WIDTH },
];

export interface ColumnGroup {
  name: string;
  colorClass: string;
  startKey: string;
  endKey: string;
}

// Updated startKeys/endKeys based on new order
export const COLUMN_GROUPS: ColumnGroup[] = [
  { name: '服務協議區', colorClass: 'bg-red-100', startKey: 'empNameEng', endKey: 'agreementRemark' },
  { name: '簽約區', colorClass: 'bg-orange-100', startKey: 'branch', endKey: 'signAmount' },
  { name: '顧客付款區', colorClass: 'bg-yellow-100', startKey: 'receiptNo', endKey: 'customerRemark' },
  { name: '學校付款區', colorClass: 'bg-green-100', startKey: 'schoolNo', endKey: 'schoolRemark' },
  { name: '大牌付款區', colorClass: 'bg-cyan-100', startKey: 'agencyNo', endKey: 'agencyRemark' },
  { name: '香港申請進度區', colorClass: 'bg-blue-100', startKey: 'consulateSubmitDate', endKey: 'immRemark' },
  { name: '海外申請進度區', colorClass: 'bg-purple-100', startKey: 'dhl1Remark', endKey: 'schoolFinishDate' },
  { name: '上班區', colorClass: 'bg-red-100', startKey: 'entryDate', endKey: 'workStartDate' },
  { name: '日子統計區', colorClass: 'bg-orange-100', startKey: 'consulateDaysDiff', endKey: 'overseasProcessDays' },
  { name: '到期日提醒區', colorClass: 'bg-yellow-100', startKey: 'renewalReminder', endKey: 'reminderType' },
  { name: '兩年後回顧區', colorClass: 'bg-green-100', startKey: 'renewalNewFileNo', endKey: 'terminateReason' },
  { name: '僱主資料區', colorClass: 'bg-cyan-100', startKey: 'employerGender', endKey: 'prevFileNo' },
  { name: '外傭資料區', colorClass: 'bg-blue-100', startKey: 'helperPhone', endKey: 'helperPrevFileNo' },
  { name: '驗身區', colorClass: 'bg-purple-100', startKey: 'checkupDate', endKey: 'checkupMethod' },
  { name: '備註區', colorClass: 'bg-red-100', startKey: 'employerRemark', endKey: 'applicationStatus' },
];