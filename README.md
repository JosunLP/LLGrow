# LLM Project

## Zielsetzung

Das Ziel dieses Projekts ist die Entwicklung eines modularen, selbstoptimierenden LLM (Language Learning Model), das in der Lage ist, autonom zu lernen und seine eigene Codebasis zu erweitern. Die Hauptziele sind:

1. **Selbstoptimierung**: Das LLM soll in der Lage sein, seine eigene Leistung durch interne Anpassungen zu verbessern.
2. **Automatisiertes Lernen**: Das Modell soll das Internet durchsuchen (crawlen) und relevante Informationen automatisch lernen.
3. **Entwicklung und Integration neuer Funktionen**: Das LLM soll in der Lage sein, neue Funktionen zu entwickeln und diese unabhängig in die eigene Codebasis zu integrieren.
4. **Datenverzeichnis**: Das LLM wird ein Datenverzeichnis nutzen, um sein Wissen in einer komprimierten und abstrahierten Form von logischen Neuronen zu speichern.
5. **Finales Ziel**: Die letztliche Vision ist die Entwicklung einer allgemeinen starken KI (Artificial General Intelligence).

## Anforderungen

- **Modularisierung**: Der Code sollte in separate Module aufgeteilt werden, um die Wartbarkeit und Erweiterbarkeit zu gewährleisten.
- **Dezentralisierung**: Neue Erweiterungen sollten in unabhängigen Modulen entwickelt werden, um die Flexibilität zu erhöhen.
- **Fehlerbehandlung**: Der Code muss flexibel genug sein, um Fehler zu identifizieren und zu korrigieren.
- **Crawling**: Das Crawling sollte selbstständig, logisch und explorativ erfolgen.
- **Datenpersistenz**: Wissensdatenbanken sollten effizient gespeichert und verwaltet werden, idealerweise unter Verwendung von SQLite.
- **Logging**: Um die Wartbarkeit zu erhöhen, sollte ein Logging-System integriert werden, um Fehler und wichtige Ereignisse zu protokollieren.

## Verzeichnisstruktur

```plaintext
llm_project/
│
├── src/
│   ├── llm/
│   │   ├── LLM.ts
│   │   ├── BasicLLM.ts
│   │   └── AdvancedLLM.ts
│   ├── utils/
│   │   ├── crawler.ts
│   │   └── database.ts
│   └── index.ts
│
├── package.json
├── tsconfig.json
└── data/
```

## Installation

### Repository klonen

```bash
git clone <repository-url>
cd llm_project
```

### Abhängigkeiten installieren

```bash
npm install
```

### Projekt starten

```bash
npm start
```

### Nutzung

> Das Projekt kann verwendet werden, um ein LLM zu trainieren, automatisch aus dem Web zu lernen und seine eigenen Funktionen zu entwickeln. Sie können die Start-URL für den Crawler im index.ts-Skript anpassen, um verschiedene Webseiten zu durchsuchen.

### Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der LICENSE-Datei.


### Hinweise zur Verwendung

- **Repository URL**: Ersetze `<repository-url>` mit der tatsächlichen URL des Repositories, wenn es gehostet wird.

Diese README-Datei gibt einen klaren Überblick über das Projekt und dessen Ziele, was für Benutzer und Entwickler hilfreich ist, die an dem LLM-Projekt interessiert sind.
