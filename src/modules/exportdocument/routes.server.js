import ExportDocx from './view/exportdocx';

export const routes = [
  {
    name: 'Export document',
    path: '/node/exportdocx/:documentid',
    method: 'get',
    callback: ExportDocx,
  }
]
