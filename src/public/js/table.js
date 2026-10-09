export function table(header, data, container) {
    const html = `
        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table class="w-full text-sm text-left rtl:text-right text-body">
                <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                    ${header.map((col) => `
                        <th scope="col" class="px-6 py-3 font-medium">
                            ${col}
                        </th>
                    `).join('')}
                </tr>
                </thead>
                <tbody>
                    ${data.map((row, index) => `
                        <tr class="bg-neutral-primary border-b border-default">
                            <td class="px-6 py-4">
                                <input class="border-none" type="text" id="${index}_name" name="fields[${index}][name]" value="${row.nombre_campo ?? ''}">
                            </td>
                            <td class="px-6 py-4">
                                <input class="border-none" type="text" id="${index}_label" name="fields[${index}][label]" value="${row.etiqueta_campo ?? ''}">
                            </td>
                            <td class="px-6 py-4">
                                <input class="border-none" type="text" id="${index}_type" name="fields[${index}][type]" value="${row.tipo_campo ?? ''}" readonly>
                            </td>
                            <td class="px-6 py-4">
                                <input class="border-none" type="number" id="${index}_length" name="fields[${index}][length]" value="${row.tamanio_campo ?? ''}" ${row.tipo_campo === 'string' ? '' : 'disabled'}>
                            </td>
                            <td class="px-6 py-4">
                                <input class="border-none" type="number" id="${index}_scale" name="fields[${index}][scale]" value="${row.decimal_campo ?? ''}"  ${row.tipo_campo === 'decimal' ? '' : 'disabled'}>
                            </td>
                            <td class="px-6 py-4">
                                <input class="text-4xl p-2" type="checkbox" id="${index}_unique" name="fields[${index}][unique]" ${row.unico_campo ? 'checked' : ''}>
                            </td>
                            <td class="px-6 py-4">
                                <input class="text-4xl p-2" type="checkbox" id="${index}_nullable" name="fields[${index}][nullable]" ${row.nullable_campo ? 'checked' : ''}>
                            </td>
                            <td class="px-6 py-4">
                                <input class="text-4xl p-2" type="checkbox" id="${index}_required" name="fields[${index}][required]" ${row.requerido_campo ? 'checked' : ''}>
                            </td>
                            <td class="px-6 py-4">
                                <input class="border-none" type="text" id="${index}_default" name="fields[${index}][default]" value="${row.default_campo ?? ''}">
                            </td>
                            <td class="px-6 py-4">
                                <button type="button" class="p-2 bg-red-500 text-md text-white font-bold" data-id="${row.id}">Eliminar</button>

                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    container.innerHTML = html;
}