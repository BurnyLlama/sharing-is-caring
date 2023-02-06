const urlBox = document.querySelector("#url")
const copyButton = document.querySelector("#copyToClipboard")

copyButton.addEventListener(
    "click",
    () => {

        urlBox.select()
        urlBox.setSelectionRange(0, -1) 
            
        navigator.clipboard.writeText(urlBox.value)

        copyButton.textContent = "Copied!"

        setTimeout(() => copyButton.textContent = "Copy the link!", 2000)
    }
)