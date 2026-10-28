const search = document.querySelector('#search');
const year = document.querySelector('#year');
const publications = [...document.querySelectorAll('.pub-group li')];
function filterPublications() {
  const words = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  publications.forEach(item => {
    const text = item.textContent.toLocaleLowerCase();
    const match = (!year.value || item.dataset.year === year.value) && words.every(word => text.includes(word));
    item.hidden = !match;
    if (match) visible++;
  });
  document.querySelectorAll('.pub-group').forEach(group => {
    const count = [...group.querySelectorAll('li')].filter(item => !item.hidden).length;
    group.hidden = count === 0;
    group.querySelector('h3 span').textContent = String(count).padStart(2, '0');
  });
  document.querySelector('#results').textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
  document.querySelector('#empty').hidden = visible !== 0;
}
search.addEventListener('input', filterPublications);
year.addEventListener('change', filterPublications);
