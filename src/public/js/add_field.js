export function addField(container,template, i){
    const clone = template.content.cloneNode(true);

    clone.querySelectorAll('*').forEach(el => {
        ['id','name','for','placeholder'].forEach(attr =>{
            if(el.hasAttribute(attr)){
                const val = el.getAttribute(attr)
                    .replace(/__IDX__/g, i)
                    .replace(/__ID__/g,`f${i}_`);
                el.setAttribute(attr,val);
            }
        });
    });

    const btn = clone.querySelector('button');
    if(btn) btn.addEventListener('click', e => e.target.closest('.row').remove());

    container.appendChild(clone);
    return i + 1;
}