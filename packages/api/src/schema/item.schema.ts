import { TypeOf, z } from 'zod';

/*------------------------------------*/

export const getItemsByStoreIdInput = z.object({
  storeId: z.string(),
});
export type GetItemsByStoreIdInputInputType = TypeOf<typeof getItemsByStoreIdInput>;

/*------------------------------------*/

export const buyItemInput = z.object({
  itemId: z.string(),
});
export type BuyItemInputType = TypeOf<typeof buyItemInput>;

/*------------------------------------*/
