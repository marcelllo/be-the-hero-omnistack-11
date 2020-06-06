const currencyFormat = {
  format: function (value) {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  },
};

export default currencyFormat;