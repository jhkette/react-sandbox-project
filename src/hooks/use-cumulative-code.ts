import {useTypedSelector} from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
        // showFunc string
        const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector('#root');
    
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
      `;
      // empty function that return nothing
        const showFuncNoop = 'var show = () => {}';
        // array of all code
        const cumulativeCode = [];
        // loop through all code cells
        for (let c of orderedCells) {
            if (c.type === 'code') {
                if (c.id === cellId) {
                  cumulativeCode.push(showFunc);
                } else {
                  cumulativeCode.push(showFuncNoop);
                }
                cumulativeCode.push(c.content);
              }
              if (c.id === cellId) {
                break;
              }
        }
        return cumulativeCode;
      }).join('\n');
}