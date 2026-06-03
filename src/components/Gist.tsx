const GIST_HOST = 'https://gist.github.com'

async function fetchGistContent(
  user: string,
  id: string,
): Promise<string | null> {
  try {
    let res = await fetch(`${GIST_HOST}/${user}/${id}/raw`, {
      redirect: 'follow',
    })
    if (!res.ok) {
      return null
    }
    return await res.text()
  } catch {
    return null
  }
}

export async function Gist({
  user,
  id,
  language = '',
}: {
  user: string
  id: string
  language?: string
}) {
  let content = await fetchGistContent(user, id)
  let gistUrl = `${GIST_HOST}/${user}/${id}`

  return (
    <figure>
      {content !== null && (
        <pre className={language ? `language-${language}` : undefined}>
          <code>{content}</code>
        </pre>
      )}
      <figcaption>
        <a href={gistUrl} target="_blank" rel="noopener noreferrer">
          View this gist on GitHub
        </a>
      </figcaption>
    </figure>
  )
}
