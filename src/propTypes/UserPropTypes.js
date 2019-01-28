import PropTypes from 'prop-types';


export const ResolverPropTypes = PropTypes.shape({
  id: PropTypes.string,
  module: PropTypes.string,
  name: PropTypes.string,
});

export const RolePropTypes = PropTypes.shape({
  description: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  resolvers: PropTypes.arrayOf(ResolverPropTypes),
});

export const UserPropTypes = PropTypes.shape({
// mongoid
id: PropTypes.string,
// имя пользователя
firstname: PropTypes.string,
// фамилия пользователя
lastname: PropTypes.string,
// отчество пользователя
patronymic: PropTypes.string,
// дата рождения пользователя
birthdate: PropTypes.string,

position: PropTypes.string,
// номер телефона пользователя
phone: PropTypes.string,
// адрес ел.почты пользователя
email: PropTypes.string,
// подпись пользователя
signature: PropTypes.string,
// роль пользователя
role: RolePropTypes
});
