const base = {
  border: '1px solid #848484',
  color: '#333333',
}

export const InputVariant = {
  default: {
    borderRadius: '5px',
    ...base,
    /** для react-select */

    rs: {
      control: {
        borderRadius: '5px',
        ...base,
      },
      selectContainer: {},
      valueContainer: {},
      dropdownIndicator: {},
      menu: {},
      option: {},
      indicatorSeparator: {},
      singleValue: {},
    }

  },
  primary: {
    ...base,
    borderRadius: '0',
    rs: {
      control: {
        borderRadius: '0',
        ...base,
      },
      selectContainer: {},
      valueContainer: {},
      dropdownIndicator: {},
      menu: {},
      option: {},
      indicatorSeparator: {},
      singleValue: {},
    }
  },
  secondary: {},
  firstField: {
    borderRadius: '5px 5px 0 0',
    ...base,
    rs: {
      control: {
        borderRadius: '5px 5px 0 0',
        ...base,
      },
      selectContainer: {},
      valueContainer: {},
      dropdownIndicator: {},
      menu: {},
      option: {},
      indicatorSeparator: {},
      singleValue: {},
    }
  },
  lastField: {
    borderRadius: '0 0 5px 5px',
    ...base,
    rs: {
      control: {
        borderRadius: '0 0 5px 5px',
        ...base,
      },
      selectContainer: {},
      valueContainer: {},
      dropdownIndicator: {},
      menu: {},
      option: {},
      indicatorSeparator: {},
      singleValue: {},
    }
  },


}
