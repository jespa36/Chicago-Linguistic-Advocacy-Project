export function ResearchFramework() {
  return (
    <section id="research" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:px-6">
      <div className="rounded-xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-serif text-2xl text-foreground">Research background</h2>
        <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          The distinction between top-down and bottom-up signs 
          comes from linguistic landscape research. Top-down signage come from governments and institutions, while bottom-up signage 
          come from shops and local communities (Landry & Bourhis, 1997). Using digital tools to document 
          these signs with photographs and interactive maps is done well by{' '}
          <a
            href="https://mlm.humanities.manchester.ac.uk/linguasnapp/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            LinguaSnapp
          </a>
          , created at the University of Manchester and later adapted for other cities, such as Hamburg. This approach is 
          described in Gaiser and Matras (2021),{' '}
          <a
            href="https://doi.org/10.1515/lingvan-2019-0012"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            “Using smartphones to document linguistic landscapes: The LinguaSnapp mobile app.”
          </a>{' '}
          To build on this research, we document written language throughout Chicago’s public environment. 
          By comparing top-down and bottom-up text, we can examine the
          gap between official language representation and the languages reflected in everyday life across Chicago.
        </p>
      </div>
    </section>
  )
}
