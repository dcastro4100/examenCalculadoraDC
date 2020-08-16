var calculadora = 
{
	
	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,
	inicializar: (function(){
		this.eventoBotones(".tecla");
		this.eventListeners();
	}),eventoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoreduceTamano;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},eventListeners: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoDigito("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoDigito("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoDigito("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoDigito("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoDigito("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoDigito("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoDigito("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoDigito("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoDigito("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoDigito("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.limpiarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.calculoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.calculoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.calculoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.calculoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.calculoOperacion("+");});
	},eventoreduceTamano: function(event){
		calculadora.reduceTamano(event.target);
	},eventoVuelveBoton: function(event){
		calculadora.aumentaTamano(event.target);
	},reduceTamano: function(elemento){
		elemento.style.padding = "1px"
	},aumentaTamano: function(elemento){
		elemento.style.padding = "0px"
	},limpiarVisor: function(){ 

	    this.valorVisor = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.actualizaVisor();
	},cambiarSigno: function(){
		if (this.valorVisor !="0") {
			var aux;
			if (this.valorVisor.charAt(0)=="-") {
				aux = this.valorVisor.slice(1);
			}	else {
				aux = "-" + this.valorVisor;
			}
		this.valorVisor = "";
		this.valorVisor = aux;
		this.actualizaVisor();
		}
	},ingresoDecimal: function(){
		if (this.valorVisor.indexOf(".")== -1) {
			if (this.valorVisor == ""){
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.actualizaVisor();
		}
	},ingresoDigito: function(valor){
		if (this.valorVisor.length < 8) {
		
			if (this.valorVisor=="0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
		this.actualizaVisor();
		}
	},calculoOperacion: function(oper){
		this.primerValor = parseFloat(this.valorVisor);
		this.valorVisor = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.actualizaVisor();
	},verResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.segundoValor = parseFloat(this.valorVisor);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		this.primerValor = this.resultado;
		this.valorVisor = "";
	
		if (this.resultado.toString().length < 9){
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0,8);
		}
	
		this.auxTeclaIgual = true;		
		this.actualizaVisor();
	
	},realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},actualizaVisor: function(){
		this.visor.innerHTML = this.valorVisor;
	}
	
};
calculadora.inicializar();