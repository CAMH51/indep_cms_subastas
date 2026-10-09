/* export function selectTipoDato(selectElement, idcontainer) {
    document.getElementById(selectElement).addEventListener('change', function() {
        const selectedValue = this.value;// Muestra el valor seleccionado en un alert
        const container = document.getElementById(idcontainer);
        
        // Buscar el template en el objeto templates pasado como parámetro
        const template = document.getElementById(`field_${selectedValue}`);
        
        if (template) {
            container.innerHTML = '';
            container.appendChild(template.content.cloneNode(true));
        } else {
            container.innerHTML = '';
        }
    });
} */

export function selectTipoDato(selectElement, idcontainer) {
    document.getElementById(selectElement).addEventListener('change', function() {
        const selectedValue = this.value;// Muestra el valor seleccionado en un alert

        if(selectedValue === 'string'){
            document.getElementById('tamanio_campo').disabled = false;
            document.getElementById('decimal_campo').disabled = true;

        }else if(selectedValue === 'decimal'){
            document.getElementById('tamanio_campo').disabled = true;
            document.getElementById('decimal_campo').disabled = false;
        }else{
            document.getElementById('tamanio_campo').disabled = true;
            document.getElementById('decimal_campo').disabled = true;
        }
        
    });
}

export function getDataField() {
        const data ={
            tipo_campo: document.getElementById('tipo_campo').value,
            nombre_campo: document.getElementById('nombre_campo').value,
            etiqueta_campo: document.getElementById('etiqueta_campo').value,
            unico_campo: document.getElementById('unique') ? document.getElementById('unique').checked : false,
            requerido_campo: document.getElementById('requerido') ? document.getElementById('requerido').checked : false,
            nullable_campo: document.getElementById('nullable') ? document.getElementById('nullable').checked : false,
            default_campo: document.getElementById('default_campo') ? document.getElementById('default_campo').value : null,
            tamanio_campo: document.getElementById('tamanio_campo') ? document.getElementById('tamanio_campo').value : null,
            decimal_campo: document.getElementById('decimal_campo') ? document.getElementById('decimal_campo').value : null
    
        }
        return data;
}
