const CarritoCompra = require("../test");

describe('CarritoCompra', () => {
  let carrito;

  beforeEach(() => {
    carrito = new CarritoCompra();
  });

  describe('constructor', () => {
    test('debe inicializar el carrito como un array vacío', () => {
      expect(carrito.carrito).toEqual([]);
      expect(carrito.carrito).toHaveLength(0);
    });
  });

  describe('agregarProducto', () => {
    test('debe agregar un producto al carrito', () => {
      const producto = { nombre: 'Laptop', precio: 1000 };
      carrito.agregarProducto(producto);
      
      expect(carrito.carrito).toHaveLength(1);
      expect(carrito.carrito[0]).toEqual(producto);
    });

    test('debe agregar múltiples productos al carrito', () => {
      const producto1 = { nombre: 'Laptop', precio: 1000 };
      const producto2 = { nombre: 'Mouse', precio: 50 };
      const producto3 = { nombre: 'Teclado', precio: 100 };
      
      carrito.agregarProducto(producto1);
      carrito.agregarProducto(producto2);
      carrito.agregarProducto(producto3);
      
      expect(carrito.carrito).toHaveLength(3);
      expect(carrito.carrito).toContain(producto1);
      expect(carrito.carrito).toContain(producto2);
      expect(carrito.carrito).toContain(producto3);
    });
  });

  describe('calcularTotal', () => {
    test('debe retornar 0 cuando el carrito está vacío', () => {
      const total = carrito.calcularTotal();
      expect(total).toBe(0);
    });

    test('debe calcular correctamente el total con un producto', () => {
      carrito.agregarProducto({ nombre: 'Laptop', precio: 1000 });
      const total = carrito.calcularTotal();
      expect(total).toBe(1000);
    });

    test('debe calcular correctamente el total con múltiples productos', () => {
      carrito.agregarProducto({ nombre: 'Laptop', precio: 1000 });
      carrito.agregarProducto({ nombre: 'Mouse', precio: 50 });
      carrito.agregarProducto({ nombre: 'Teclado', precio: 100 });
      
      const total = carrito.calcularTotal();
      expect(total).toBe(1150);
    });

    test('debe manejar productos con precios decimales', () => {
      carrito.agregarProducto({ nombre: 'Café', precio: 2.50 });
      carrito.agregarProducto({ nombre: 'Pan', precio: 1.75 });
      
      const total = carrito.calcularTotal();
      expect(total).toBeCloseTo(4.25);
    });
  });

  describe('aplicarDescuento', () => {
    beforeEach(() => {
      carrito.agregarProducto({ nombre: 'Laptop', precio: 1000 });
      carrito.agregarProducto({ nombre: 'Mouse', precio: 100 });
    });

    test('debe aplicar un descuento del 10%', () => {
      const totalConDescuento = carrito.aplicarDescuento(10);
      expect(totalConDescuento).toBe(990); // 1100 - 10% = 990
    });

    test('debe aplicar un descuento del 50%', () => {
      const totalConDescuento = carrito.aplicarDescuento(50);
      expect(totalConDescuento).toBe(550); // 1100 - 50% = 550
    });

    test('debe retornar el total sin cambios si el descuento es 0', () => {
      const totalConDescuento = carrito.aplicarDescuento(0);
      expect(totalConDescuento).toBe(1100);
    });

    test('debe retornar 0 si el descuento es 100%', () => {
      const totalConDescuento = carrito.aplicarDescuento(100);
      expect(totalConDescuento).toBe(0);
    });

    test('debe manejar descuentos con decimales', () => {
      const totalConDescuento = carrito.aplicarDescuento(15.5);
      expect(totalConDescuento).toBeCloseTo(929.5); // 1100 - 15.5% = 929.5
    });

    test('debe retornar 0 cuando el carrito está vacío', () => {
      const carritoVacio = new CarritoCompra();
      const totalConDescuento = carritoVacio.aplicarDescuento(20);
      expect(totalConDescuento).toBe(0);
    });
  });
});