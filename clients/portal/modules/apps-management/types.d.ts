type AppInfo = {
  id: string;
  appName: string;
  appIcon: string;
  useStatus: number;
}

// todo refactor this
type BgColor =
  'amber' | 'indigo' | 'teal' | 'fuchsia' | 'emerald' | 'cyan' | 'red' | 'orange';
type AppIconInfo = {
  bgColor: BgColor;
  iconName: string;
}

type FilterOption = {
  range?: boolean;
  compareSymbol?: string;
}

type EnumItem = {
  label: string;
  name: string;
  title: string;
  value: string;
}

type ComponentProps = {
  placeholder?: string;
  precision?: number;
  step?: number;
}

type PageField = {
  id: string;
  label: string;
  type: string,
  cProps: ComponentProps;
  isSystem: boolean;
  expand?: boolean;
  filter?: boolean;
  visible?: boolean;
  sort: number;
  option?: FilterOption;
  enum?: EnumItem[];
}

type FilterField = {
  id: string;
  label: string;
  type: string,
  placeholder: string;
  cProps: Record<string, any>
  multiple?: boolean;
  compareSymbol?: string;
  step?: number;
  precision?: number;
  enum?: EnumItem[];
}

type Condition = {
  key?: string;
  op?: string;
  value?: Array<string | number | Date>;
}

type PageInfo = {
  id: string;
  appID?: string;
  name?: string;
  icon?: string;
  describe?: string;
  groupID?: string;
  child?: PageInfo[];
  menuType?: number;
  sort?: number;

}

type AppParams = {
  appId: string
}

type FormDesignParams = {
  pageId: string;
  appID: string;
  pageType: string;
  navType?: string;
}

type Rights = {
  id: string;
  formID?: string;
  sequence?: number;
  scopes?: DeptAndUser[];
} & RightsCreate

type RightsCreate = {
  name?: string;
  description?: string;
}

type DeptAndUser = {
  type: number;
  id: string;
  name: string;
}