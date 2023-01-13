const STORAGE_KEY = 'ShoppingList';

function newItemId() {
  return Date.now();
}

export type Item = {
  id: number;
  name: string;
  qty?: number;
  qtyUnit?: string;
  checked: boolean;
};

export function saveList(list: Item[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getList(): Item[] {
  const storedValue = localStorage.getItem(STORAGE_KEY);
  return storedValue ? JSON.parse(storedValue) : [];
}

export function addItem(list: Item[], item: Pick<Item, 'name' | 'qty' | 'qtyUnit'>) {
  const { name, qty, qtyUnit } = item;
  list.push({ id: newItemId(), name, qty, qtyUnit, checked: false });
  saveList(list);
}

export function updateItem(list: Item[], item: Pick<Item, 'id'> & Partial<Omit<Item, 'id'>>) {
  const { id: itemId, name, qty, qtyUnit, checked } = item;
  const itemToUpdate = list.find(({ id }) => id === itemId);
  if (
    itemToUpdate &&
    (name !== undefined || qty !== undefined || qtyUnit !== undefined || checked !== undefined)
  ) {
    name !== undefined && (itemToUpdate.name = name);
    qty !== undefined && (itemToUpdate.qty = qty);
    qtyUnit !== undefined && (itemToUpdate.qtyUnit = qtyUnit);
    checked !== undefined && (itemToUpdate.checked = checked);
    saveList(list);
  }
}

export function deleteItem(list: Item[], itemId: Item['id']) {
  const index = list.findIndex(({ id }) => id === itemId);
  if (index >= 0) {
    list.splice(index, 1);
    saveList(list);
  }
}
