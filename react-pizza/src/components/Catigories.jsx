import React from 'react';

function Catigories({ items, catigories, setCatigories }) {
  return (
    <div className='categories'>
      <ul>
        {items &&
          items.map((obj, index) => (
            <li
              className={catigories === index ? 'active' : ''}
              onClick={() => setCatigories(index)}
              key={obj}
            >
              {obj}
            </li>
          ))}
      </ul>
    </div>
  );
}
// Классовый компонент
// class Catigories extends React.Component {
//   state = {
//     activeItem: 0,
//   };
//   onSelectItem = (index) => {
//     this.setState({
//       activeItem: index,
//     });
//   };
//   render() {
//     const { items } = this.props;
//     return (
//       <div className='categories'>
//         <ul>
//           {items.map((obj, index) => (
//             <li
//               className={this.state.activeItem === index ? 'active' : ''}
//               onClick={() => this.onSelectItem(index)}
//               key={obj}
//             >
//               {obj}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

export default Catigories;
