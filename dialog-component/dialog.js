// ToDo
  // add closing and closed events
  // add opening and opened events
  // add removed event
  // removing loading attribute

  export default async function(dialog) {
    dialog.addEventListener('click', lightDismiss)
  }

  const lightDismiss = ({target:dialog}) => {
    //  after watching click on dialog element
    //  it closes when if it's top-element is clicked
      if (dialog.nodeName === 'DIALOG') dialog.close('dismiss')
  }