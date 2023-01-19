<template>
  <div class="parzival-transcript-doc modal"
    :class="active('transcriptDocModal')"
    @keyup.esc="$emit('close-info')"
    v-focus="transcriptDocModal"
    tabindex="1002">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="hero is-light">
        <div class="hero-body">
          <div class="container content parzival-content">
            <h3>Erläuterungen zur Transkription</h3>

            <p>Die Verszählung bei Wolframs von Eschenbach ›Parzival‹ folgt derjenigen der
              Ausgabe: Wolfram von Eschenbach. Parzival. Studienausgabe. 2. Auflage.
              Mittelhochdeutscher Text nach der sechsten Ausgabe von Karl Lachmann,
              Übersetzung von Peter Knecht. Mit Einführungen zum Text der Lachmannschen
              Ausgabe und in Probleme der ›Parzival‹-Interpretation von Bernd Schirok (de
              Gruyter Texte), Berlin/New York 2003.</p>

            <p>Die Verszählung folgt beim <b>›Nuwen Parzifal‹ (NP)</b> der Ausgabe: Parzifal von Claus
              Wisse und Philipp Colin (1331–1336). Eine Ergänzung der Dichtung Wolframs von
              Eschenbach. Zum ersten Male hrsg. von Karl Schorbach (Elsässische
              Litteraturdenkmäler aus dem XIV–XVII. Jahrhundert 5), Straßburg/London 1888
              [Neudruck Berlin/New York 1974 und Berlin/Boston 2010].</p>

            <p>Die Verszählung des Prologus nach der ›Élucidation‹, dt., wird fortlaufend mit
              voranstehendem 'Pr' nummeriert, jene des Epilogs zum ›Rappoltsteiner Parzifal‹ mit
              voranstehendem 'Ep'.</p>

            <p>Die Ergänzung [0] am Ende einer Versnummer bezeichnet Kustoden, Reklamanten und Notizen in den
              Handschriften (kursiv markiert).</p>

            <p>Die Ergänzung [01][01] am Ende einer Versnummer bezeichnet eine Anweisung an
              den Rubrikator (kursiv markiert, betrifft nur V').</p>

            <p>Die Ergänzung [01] am Ende einer Versnummer wird grundsätzlich bei
              Kapitelüberschriften und im Zusammenhang mit den kürzeren Texten auf Blatt
              115r/v und Blatt 320v von Handschrift V verwendet. Folgen mehrere Paratexte
              aufeinander, werden diese der Reihenfolge nach mit [01], [02] usw. nummeriert
              (Beispiel siehe V', 793.27[01], 793.27[02]).</p>

            <p>Die Ergänzung [1] am Ende einer Versnummer bezeichnet einen Plusvers oder einen
              doppelt abgeschriebenen Vers.</p>

            <p>Editorische Erläuterungen stehen kursiviert zwischen senkrechten Strichen und
              werden aus technischen Gründen durch Versziffern eingeleitet.</p>


            <p>Die Transkriptionen der Texte aus den Handschriften V und V' erfolgen
              handschriftengetreu. Nicht umgesetzt wird das geschweifte z. Die Abkürzungen
              werden in runden Klammern aufgelöst. Hierbei ist zu beachten, dass vn̅ dem
              Quantitätsprinzip entsprechend in V mit vn(de) und in V' mit vn(d) aufgelöst wird.</p>

            <p>Längsstriche zur Linken der Versnummerierung markieren Versumstellungen.</p>


            <p>Zeilenumbrüche (außerhalb der Konvention von abgesetzten Versen) werden mit
              einem senkrechten Strich (|) markiert. Worttrennungen mit Trennungszeichen
              werden mit =| wiedergegeben.</p>


            <p>Rubrizierte Buchstaben werden in roter Farbe wiedergegeben.</p>

            <p>Diakritische Zeichen werden als solche dargestellt. Zirkumflex wird grundsätzlich
              gemäß der Handschrift transkribiert. Ausnahme: Zirkumflex über Diphthongen und
              mehr als zwei Vokalen in Folge wird stets über dem ersten Vokal wiedergegeben.</p>

            <p>Unlesbarkeit aufgrund von materieller Beeinträchtigung wird durch :::
              gekennzeichnet. Bei nicht durch materielle Beeinträchtigung bedingter Unlesbarkeit
              wird : bei einem, :: bei zwei und ::: bei drei oder mehr unleserlichen Buchstaben
              angegeben. Durch ::: (kursiv) wird der Textverlust infolge Beschnitts bei der
              Anweisung an den Rubrikator auf Bl. 139va von Hs. V' markiert.</p>

            <p>Initialen und Paratexte werden wie folgt ausgezeichnet:</p>
            <ul class="parzival-sample">
              <li><span class="hi red bold">rot und fett markiert</span> = Eingangsinitialen;</li>
              <li><span class="hi red">rot</span> = rote Überschriften;</li>
              <li><span class="anweisung">kursiv</span> = Anweisungen an den Rubrikator.</li>
            </ul>

            <p>Bei Korrekturen werden die Korrekturresultate angezeigt; die unkorrigierten Formen
              werden über Mouseover eingeblendet.</p>

            <p>Die unterschiedlichen Korrekturarten werden wie folgt unterschieden:</p>
            <ul class="parzival-sample">
              <li><span class="damage">grau hinterlegt</span>, <span class="klebung">eingerahmt</span> und <span class="corr">unterpunktet</span> = Korrektur durch aufgeklebtes Pergamentstück;</li>
              <li><span class="damage">grau hinterlegt</span> und <span class="corr">unterpunktet</span> = Korrektur durch Rasur;</li>
              <li><span class="del">durchgestrichen</span> = Korrektur durch Streichung;</li>
              <li><span class="edited add">grün</span> = Hinzufügungen.</li>
            </ul>

            <p>In der synoptischen Darstellung der Transkriptionen der Handschriften V und V'
              werden in der kürzenden Textversion der Handschrift V' Wörter, die aus
              umgebenden Versen der Vorlage V stammen, blau unterstrichen; die entsprechende
              Versangabe zu Handschrift V wird über Mouseover eingeblendet (Beispiel siehe V',
              33445).</p>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="$emit('close-info')"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranscriptInfo',
  props: ['transcriptDocModal']
}
</script>
