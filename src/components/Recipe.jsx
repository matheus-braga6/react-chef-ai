export default function Receipe (props) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <div dangerouslySetInnerHTML={{ __html: props.recipe }} />
    </section>
  )
}