// store.ts
import { useExternalStore } from 'react';

import { buildQueue } from './buildQueue';
import { processUpload } from './processUpload';


let listeners = [];
let files = [];

const queue = buildQueue();

function emitChange() {
  files = [...queue.queue];
  listeners.forEach((l) => l());
}

function updateStatus(target, status) {
  target.status = status;
  emitChange();
}

export function getSnapshot() {
  return files;
}

export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function add(newFiles) {
  const uploadables = newFiles.map((f) => ({
    id: crypto.randomUUID(),
    file: f,
    status: 'pending',
  }));

  queue.push(uploadables);
  emitChange();
}

let iterator = null;

export async function process() {
  if (iterator) return;

  iterator = queue.go();

  for await (const item of iterator) {
    updateStatus(item, 'uploading');
    await processUpload(item);
    updateStatus(item, 'complete');
  }

  iterator = null;
}

export function abort() {
  return iterator?.return?.();
}


export function useReplenishableQueue() {
  return useExternalStore(subscribe, getSnapshot);
}

// example
// import { useEffect } from 'react';
// import { useReplenishableQueue, process, abort, add } from './store';

// export default function MediaUpload() {
//   const files = useReplenishableQueue();

//   useEffect(() => {
//     process();
//     return () => {
//       abort();
//     };
//   }, []);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const droppedFiles = Array.from(event.dataTransfer.files);
//     add(droppedFiles);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div>
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         style={{ border: '1px dashed #ccc', padding: 16 }}
//       >
//         Drop files here
//       </div>

//       <ul>
//         {files.map((f) => (
//           <li key={f.id}>
//             {f.file.name} - {f.status}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

