import { v4 as uuidv4 } from 'uuid';

function addUniqueKey<T extends object>(array: T[]) {
  return array.map((item) => {
    return { __id: uuidv4(), ...item };
  });
}

/**
 * convert a flat list of nodes into tree array
 * @param array list of nodes as flat array
 * @param parentChildData data to locate node parents
 */
function listToTree<T extends object>(array: T[], parentChildData: (node: T, list: T[]) => T | undefined): (T & { children?: T[] })[] {
  let root: (T & { children?: T[] })[] = [];
  array.forEach((el) => {
    // Use our mapping to locate the parent element in our data array
    const parent = parentChildData(el, array);

    if (!parent) {
      root.push(el);
      return;
    }
    // Add our current el to its parent's `children` array
    (parent as any).children = [...((parent as any).children || []), el];
  });

  return root;
}

function normalizeArray<T>(array: T[]): T[] {
  return array.filter(Boolean);
}

export { addUniqueKey, listToTree, normalizeArray };
