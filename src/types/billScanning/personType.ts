import { BillItem, PersonShare } from './billItemType';

export type Person = {
  name: string;
  payingItems: BillItem[]; // Keep for backward compatibility
};

// New type for managing item shares
export type ItemShareData = {
  [itemId: number]: PersonShare[];
};
