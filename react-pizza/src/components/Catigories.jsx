import React from 'react';
import PropTypes from 'prop-types';

const Catigories = React.memo(function Catigories({ activeCategory, items, onClickCategory }) {
  return (
    <div className='categories'>
      <ul>
        {items &&
          items.map((obj, index) => (
            <li
              className={activeCategory === index ? 'active' : ''}
              onClick={() => onClickCategory(index)}
              key={obj}
            >
              {obj}
            </li>
          ))}
      </ul>
    </div>
  );
});

Catigories.propTypes = {
  activeCategory: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClickCategory: PropTypes.func,
};

Catigories.defaultProps = { activeCategory: 0, items: [] };

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
