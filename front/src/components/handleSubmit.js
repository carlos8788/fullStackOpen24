export default function handleSubmit(e) {
    e.preventDefault();

    const entries = Object.fromEntries(new FormData(e.target))
    
}