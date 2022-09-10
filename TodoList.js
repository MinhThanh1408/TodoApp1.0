document.querySelector('#buttonLogOut').addEventListener('click',function(e){
    e.preventDefault();
    alert('Dang xuat');
})
document.querySelector('#addTask').addEventListener('click',function(){
    alert('Add Task');
})
console.log(document.querySelector('#userName'));
document.querySelector('#userName').innerHTML = 'Minh Thanh'
// console.log(document.querySelector('#user-name'));
// document.querySelector('#user-name').innerHTML = 'Minh Thanh';