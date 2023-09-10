import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	// onAuthStateChanged,
     database,
    set,ref,update,
	// signOut,
	// doc,
	// setDoc,
	// db,
	// getDoc,
	// updateDoc,
	// getStorage,
	// storage,
	// uploadBytesResumable,
	// getDownloadURL,
	// reauthenticateWithCredential,
	// EmailAuthProvider,
	// updatePassword,
	// collection,
	// addDoc,
	// serverTimestamp,
	// query,
	// where,
	// getDocs,
	// deleteDoc,
} from './config.js';
// Loader

const spiner = document.getElementById('spiner');

function showLoader() {
	spiner.style.display = 'flex';
}
function hideLoader() {
	spiner.style.display = 'none';
}
// Sign  Up Button
let flag=true;
const signupBtn = document.getElementById('signupBtn');

const signup = () => {
	let fullName = document.getElementById('fullName');
	let Password = document.getElementById('password');
	let email = document.getElementById('email');

	const user = {
		fullName: fullName.value,
		email: email.value,
		Password: Password.value,
	};
	if (!user.fullName || !user.email  || !user.Password) {
		Swal.fire('Please fill out  all fields');
		return;
	}
	flag = false;

	createUserWithEmailAndPassword(auth, user.email, user.Password)
		.then((res) => {
            const user = res.user;
			showLoader();
			console.log(user);
			set(ref(database,'users/'+user.uid),{
                fullName : fullName.value,
                email : email.value,
                Password : Password.value
            })
            hideLoader();
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'User has been created',
				showConfirmButton: false,
				timer: 1500,
			});

			
			setTimeout(() => {
				flag = true;
				location.href = '/dashboard.html';
			}, 2000);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			let errorText = errorMessage;
			switch (errorMessage) {
				case 'Firebase: Error (auth/invalid-email).':
					errorText = 'Invalid Email';
					break;
				case 'Firebase: Error (auth/email-already-in-use).':
					errorText = 'This email is already in use. Try different';
					break;
				default:
					errorText = errorText;
			}
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorText,
			});
			hideLoader();
		});
};
signupBtn && signupBtn.addEventListener('click', signup);

// Sign IN

const signinBtn = document.getElementById('signInBtn');

const signIn = () => {
	let email = document.getElementById('email');
	let password = document.getElementById('password');
	if ((!email.value, !password.value)) {
		Swal.fire('Please fill out  all fields');
		return;
	}
	flag = false;
	showLoader();
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then((res) => {
            const dt = new Date();
			const user = res.user;
			console.log(user);
            update(ref(database,'users/'+user.uid),{
                lastLogin : dt,
            })
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Logged In',
				showConfirmButton: false,
				timer: 1500,
			});

			hideLoader();
			setTimeout(() => {
				flag = true;
				location.href = "/dashboard.html";
			}, 2000);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			let errorText = errorMessage;
			switch (errorMessage) {
				case 'Firebase: Error (auth/wrong-password).':
					errorText = 'Invalid Password';
					break;
				case 'Firebase: Error (auth/user-not-found).':
					errorText = 'Email is not correct';
					break;
				default:
					errorText = 'Something went wrong';
			}
			hideLoader();
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorText,
			});
		});
};
signinBtn && signinBtn.addEventListener('click', signIn);



// // Blog Post

// const postBlog = document.getElementById('postBlog');

// const submitBlog = () => {
// 	let blog_heading = document.getElementById('blog-title');
// 	let blog_content = document.getElementById('blog-content');
// 	console.log("hello");
// 	const currentUser = auth.currentUser;
// 	const publishedDate = new Date().toLocaleString();
// 	insertData();
// 	// showLoader();
// 	// Create new blog element
//    const blogElement = document.createElement('div');
//    blogElement.innerHTML = `<div class="div"></div>
//    <h1 id="h2">${blog_heading}</h1>
//   <p id="on"><b>Published on:</b> ${publishedDate}</p>
// 	  <p class="para">${blog_content}</p>
// 	  <button class="editBtn">Edit</button>
// 	  <button class="deleteBtn">Delete</button>
//   `;
// 	// Add event listeners for edit and delete buttons
// 	const editBtn = blogElement.querySelector('.editBtn');
// 	editBtn.addEventListener('click', function () {
// 	  let blog_heading = document.getElementById("blog-title").value;
// 	  let blog_content = document.getElementById("blog-content").value;
// 	  const New_heading = prompt('Enter new title:', blog_heading);
// 	  const New_content = prompt('Edit blog', blog_content)
// 	  if (New_heading !== null || New_content !== null) {
// 		blogElement.querySelector('h2').textContent = New_heading;
// 		blogElement.querySelector('.para').textContent = New_content;
// 		let uniqueId = auth.currentUser.uid;
// 		update(ref(database, "blog/" + uniqueId), {
// 		  New_heading: New_heading,
// 		  New_content: New_content
// 		})
// 		  .then(function () {
// 			alert("Blog updated successfully");
// 		  })
// 		  .catch(function (error) {
// 			alert("Error updating blog: " + error);
// 		  });
// 		  document.getElementById("blog-heading").value = "";
// 		  document.getElementById("blog-content").value = "";
// 	  }
// 	});
// 	console.log('User Data', userData.data());

// 	// hideLoader();
// 	// Swal.fire('Blog', 'Blog published', 'success');
// 	// getCurrentUserBlogs(currentUser.uid);
// 	// title.value = '';
// 	// textarea.value = '';
// };

// postBlog && postBlog.addEventListener('click', submitBlog);

const insertData = () =>{
	let blog_heading = document.getElementById("blog-title").value;
	let blog_content = document.getElementById("blog-content").value;
	let uniqueId = auth.currentUser.uid;
	console.log(uniqueId);
	set(ref(database, "blog/" + uniqueId), {
	  blog_heading: blog_heading,
	  blog_content: blog_content
	}).then((resolve) => {
	  console.log("load Successfully");
  
	}).catch((error) => {
	  console.log("Unload");
	})
  }
  const getData = () =>{
	  const dbRef = ref(getDatabase());
	  let uniqueId = auth.currentUser.uid;
	get(child(dbRef, `blog/${uniqueId}`)).then((snapshot) => {
	  if (snapshot.exists()) {
		console.log(snapshot.val());
	  } else {
		console.log("No data available");
	  }
	}).catch((error) => {
	  console.error(error);})}

	  
const submitBlog = () => {
  let blog_heading = document.getElementById("blog-title").value;
let blog_content = document.getElementById("blog-content").value;
  alert("Published Blog Post");
  // let published_blog = document.getElementById("publish-content");
  const publishedDate = new Date().toLocaleString();
  insertData();
  console.log(publishedDate);
  // Create new blog element
 const blogElement = document.createElement('div');
 blogElement.innerHTML = `<div class="div"></div>
 <h1 id="h2">${blog_heading}</h1>
<p id="on"><b>Published on:</b> ${publishedDate}</p>
    <p class="para">${blog_content}</p>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
`;
  // Add event listeners for edit and delete buttons
  const editBtn = blogElement.querySelector('.editBtn');
  editBtn.addEventListener('click', function () {
    let blog_heading = document.getElementById("blog-title").value;
    let blog_content = document.getElementById("blog-content").value;
    const New_heading = prompt('Enter new title:', blog_heading);
    const New_content = prompt('Edit blog', blog_content)
    if (New_heading !== null || New_content !== null) {
      blogElement.querySelector('h2').textContent = New_heading;
      blogElement.querySelector('.para').textContent = New_content;
      let uniqueId = auth.currentUser.uid;
      update(ref(database, "blog/" + uniqueId), {
        New_heading: New_heading,
        New_content: New_content
      })
        .then(function () {
          alert("Blog updated successfully");
        })
        .catch(function (error) {
          alert("Error updating blog: " + error);
        });
        document.getElementById("blog-title").value = "";
        document.getElementById("blog-content").value = "";
    }
  });

  const deleteBtn = blogElement.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', function () {
    const confirmDelete = confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      let uniqueId = auth.currentUser.uid;
      remove(ref(database, "blog/" + uniqueId))
        .then(function () {
          alert("Blog deleted successfully");
        })
        .catch(function (error) {
          alert("Error deleting blog: " + error);
        });
      blogElement.innerHTML = ""
    }
  });
  // Append new blog to the list
  blog-posts.appendChild(blogElement);
getData();
};
publish-btn && publish-btn.addEventListener('click', submitBlog);



