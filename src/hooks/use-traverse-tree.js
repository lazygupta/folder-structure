const useTraverseTree = () => {
  const insertNode = (treeArray, folderId, item, isFolder) => {
    return treeArray.map((node) => {
      if (node.id === folderId && node.isFolder) {
        return {
          ...node,
          items: [
            {
              id: Date.now(),
              name: item,
              isFolder,
              items: []
            },
            ...node.items
          ]
        };
      }

      if (node.items.length > 0) {
        return {
          ...node,
          items: insertNode(node.items, folderId, item, isFolder)
        };
      }

      return node;
    });
  };

  return { insertNode };
};

export default useTraverseTree;
