// ToDo
  // add closing and closed events
  // add opening and opened events
  // add removed event
  // removing loading attribute

  //track opening
  const openingMutation =  async (mutations, attrObeserver) => {
    await mutations.reduce(async (animation , mutation) => {
     await animation;
     console.log(animation)
     if(mutation.attributeName === 'open') {
      const dialog = mutation.target
      // check if attribute has open in it 
      // if it doesn't the function do nothing do nothing
      const isOpen = dialog.hasAttribute('open')
      if(!isOpen) return

      dialog.removeAttribute('inert')

      // set focus and set fallback if focustarget doesn't exist
      const focusTarget = dialog.querySelector('[autofocus]')
       if(focusTarget) {
         focusTarget.focus()
       } else {
         dialog.querySelector('button').focus()
       }

       dialog.dispatchEvent(dialogOpeningEvent)
       await animationComplete(dialog)
       dialog.dispatchEvent(dialogOpeningEvent)

     }
     }, Promise.resolve())
  }

  const dialogAttrObserver = new MutationObserver(openingMutation)

  export default async function (dialog) {
    dialog.addEventListener('click', lightDismiss)
  }

  const lightDismiss = ({target:dialog}) => {
    //  after watching click on dialog element
    //  it closes when if it's top-element is clicked
      if (dialog.nodeName === 'DIALOG') dialog.close('dismiss')
  }