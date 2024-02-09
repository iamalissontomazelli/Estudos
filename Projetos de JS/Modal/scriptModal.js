const button = document.querySelector("button")
const modal = document.querySelector("dialog")
const buttonClose = document.querySelector("dialog button")

button.onclick = function () {
    /* precionando esc vai fechar modal (showModal) */
    modal.showModal()
}
buttonClose.onclick = function () {
    modal.close()
}