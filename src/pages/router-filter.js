const filterForm = document.forms.selectProccess;
console.log(filterForm);

const ptoContainer = document.querySelector('.pto-items-container');
const ptoItems = document.querySelectorAll('.pto-item');
const ptoContainerTitle = document.querySelector('.pto-items-title');

function scrollToStart() {
  ptoContainerTitle.scrollIntoView({
    behavior: 'smooth'
  });
}

function showOnlyFiltered(nodes , checkedFromForm) {
  return nodes.map((node)=> {
    const isAccept = checkedFromForm.reduce((acc, i)=> {
      return acc || node.dataset.process.includes(i);
    }, false);
    if (!isAccept) {
      node.classList.add('hidden1')
    } else if (node.classList.contains('hidden1')) {
      node.classList.remove('hidden1');
    }
    return node;
  })
}

function showAll() {
  return Array.from(ptoItems).map((node)=> {
    if (node.classList.contains('hidden1')) {
      node.classList.remove('hidden1');
    }
    return node;
  })
}

filterForm.addEventListener('change', (evt) => {
  const isSomebodyChecked = Array.from(filterForm.elements.process).reduce((acc,i)=> acc || i.checked, false);
  //console.log(isSomebodyChecked);
  if (isSomebodyChecked) {
    const checkedFromForm = Array.from(filterForm.elements.process).filter((item)=>{
      return item.checked;
    }).map((item)=> {
      return item.value;
    });
    showOnlyFiltered(Array.from(ptoItems), checkedFromForm);
    scrollToStart();
  } else {
    showAll();
    scrollToStart();
  }
});