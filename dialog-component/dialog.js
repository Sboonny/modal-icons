// ToDo
  const dialogClosingEvent = new Event('closing')
  const dialogClosedEvent = new Event('closed')
  const dialogOpeningEvent = new Event('opening')
  const dialogOpenedEvent  = new Event('opened')
  const dialogRemovedEvent  = new Event('remove')

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
       dialog.dispatchEvent(dialogOpenedEvent)

     }
     }, Promise.resolve())
  }
  const deletingMutation =  async (mutations, attrObeserver) => {
    mutations.forEach(mutation => {
      mutation.removedNodes.forEach(removedNode => {
        if (removedNode.nodeName === 'DIALOG') {
          removedNode.removeEventListener('click', lightDismiss)
          removedNode.removeEventListener('close', dialogClose)
          removedNode.dispatchEvent(dialogRemovedEvent)
        }
      })
    })
  }


  const dialogAttrObserver = new MutationObserver(openingMutation)
  const dialogDeleteObserver = new MutationObserver(deletingMutation)

  export default async function (dialog) {
    dialog.addEventListener('click', lightDismiss)
    dialog.addEventListener('close', dialogClose)
    dialogAttrObserver.observe(dialog, {
      attributes: false
     })
    dialogDeleteObserver.observe(document.body, {
      attributes: false,
      subtree: false,
      childList: false
     })
     await animationsComplete(dialog)
     dialog.removeAttribute('loading')
  }

  const lightDismiss = ({target:dialog}) => {
    //  after watching click on dialog element
    //  it closes when if it's top-element is clicked
      if (dialog.nodeName === 'DIALOG') dialog.close('dismiss')
  }

  const dialogClose = async ({target:dialog}) => {
   dialog.setAttribute('inert','')
   dialog.dispatchEvent(dialogClosingEvent)

   await animationComplete(dialog)

   dialog.dispatchEvent(dialogClosedEvent)
  }

  const animationComplete = (element) => {
    Promise.allSettled(
      element.getAnimation().map(animation => animation.finished)
    )
  }