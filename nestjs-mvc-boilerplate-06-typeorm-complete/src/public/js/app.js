function updateBook() {
  const createForm = document.getElementById('form');
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = createForm['id'].value;
    await fetch(`http://localhost:3000/book/${id}`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: createForm['title'].value,
        author: createForm['author'].value,
        quantity: createForm['quantity'].value,
        description: createForm['description'].value,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res) {
          document.querySelector('.alert').removeAttribute('hidden');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
  });
}

async function deleteBook(id) {
  console.log(id);
  await fetch(`http://localhost:3000/book/${id}`, {
    method: 'DELETE',
  }).then(() => (window.location.href = '/book'));
}

updateBook();
