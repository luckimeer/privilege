// DOM Objects
const yourPrivilegeBar = document.getElementById('yourPrivilegeBar');
const yourPrivilegedOutline = document.getElementById('yourPrivilegeOutline');
const mostRecentScore = localStorage.getItem('mostRecentScore');

yourPrivilegeBar.style.height = (mostRecentScore * 6) + "rem";
yourPrivilegedOutline.style.height = (mostRecentScore * 6) + "rem";