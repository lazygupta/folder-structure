import { useState } from 'react'
import explorer from './data/folderData'
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree';

function App() {
  const [folderData, setFolderData] = useState(explorer)

const {insertNode} = useTraverseTree();

const handleInsertNode = (folderId,item,isFolder) => {
  const finalTree = insertNode(folderData,folderId,item,isFolder)
  setFolderData(finalTree);
}

  return (
    <div className='h-screen p-3'>
        <div className='p-1 '>
          <div>
          {folderData.map((rootNode) => (
                <Folder
                    key={rootNode.id}
                    explorer={rootNode}
                    handleInsertNode={handleInsertNode}
                />
            ))}
          </div>
        </div>
    </div>
  )
}

export default App
