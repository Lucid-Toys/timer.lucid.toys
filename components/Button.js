export default function Button({ label, onClick, variant = "default" }) {
  return (
    <>
      <button className={variant} onClick={onClick}>
        {label}
      </button>
      <style jsx>{`
        button {
          appearance: none;
          border: 0;
          border-radius: 0.25em;
          font: inherit;
          font-size: 2rem;
          font-weight: 500;
          color: var(--dark);
          background-color: var(--focus);
          display: block;
          width: 100%;
          padding: 0.25em;
          cursor: pointer;
        }

        .danger {
          background-color: var(--danger);
          color: var(--light);
        }
      `}</style>
    </>
  )
}
