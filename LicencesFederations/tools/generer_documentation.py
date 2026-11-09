# -*- coding: utf-8 -*-
"""
Génère la documentation technique du modèle à partir des fichiers TMDL du projet PBIP.

    python tools/generer_documentation.py

Produit (à la racine du projet) :
  docs/02_Dictionnaire_donnees.md  tables, colonnes, relations (généré)
  docs/03_Catalogue_mesures.md     mesures DAX par dossier, avec description et code (généré)
  powerquery/*.pq                  code M de chaque requête Power Query (généré)

Aucune dépendance externe (bibliothèque standard Python 3.8+).
À relancer après chaque modification du modèle (Ctrl+S dans Power BI Desktop).
"""
import os, re, glob, collections

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEF = os.path.join(RACINE, "reports", "Licences_Federations.SemanticModel", "definition")
MAX_CODE = 6000          # au-delà, le code DAX est tronqué dans le catalogue (mesures HTML)


def lire(p):
    with open(p, encoding="utf-8-sig") as f:
        return f.read().replace("\r\n", "\n")


def unq(s):
    s = s.strip()
    return s[1:-1].replace("''", "'") if s.startswith("'") and s.endswith("'") else s


def blocs(texte):
    """Découpe un fichier TMDL de table en objets (table, colonnes, mesures, partitions)."""
    L = texte.split("\n")
    table = {"desc": [], "nom": "", "objets": []}
    desc, cur = [], None
    for ln in L:
        if ln.startswith("///"):
            table["desc"].append(ln[3:].strip()); continue
        m = re.match(r"^table (.+)$", ln)
        if m:
            table["nom"] = unq(m.group(1)); continue
        if ln.startswith("\t///"):
            desc.append(ln[4:].strip()); continue
        m = re.match(r"^\t(measure|column|partition|calculationItem) (.+)$", ln)
        if m:
            genre, reste = m.groups()
            if genre == "partition":
                nom, expr = reste.split(" = ")[0], ""
            elif re.search(r"\s=(\s|$)", reste):
                nom, expr = re.split(r"\s=(?:\s|$)", reste, 1)
            else:
                nom, expr = reste, None
            cur = {"genre": genre, "nom": unq(nom), "desc": desc, "expr": [expr] if expr else [],
                   "props": {}, "calc": expr is not None and genre == "column"}
            desc = []
            table["objets"].append(cur); continue
        if re.match(r"^\t\S", ln):
            cur = None; desc = []; continue
        if cur is None:
            continue
        if ln.startswith("\t\t\t") or (ln.strip() == "" and cur["expr"] and not cur["props"]):
            cur["expr"].append(ln[3:] if ln.startswith("\t\t\t") else "")
        elif ln.startswith("\t\t"):
            p = ln.strip()
            if ":" in p and not p.startswith("annotation"):
                k, v = p.split(":", 1); cur["props"][k.strip()] = v.strip()
            elif p in ("isHidden",):
                cur["props"][p] = True
            elif p.startswith("source ="):
                cur["props"]["source"] = p[len("source ="):].strip()
    for o in table["objets"]:
        o["expr"] = "\n".join(o["expr"]).strip()
    return table


def tables():
    res = []
    for f in sorted(glob.glob(os.path.join(DEF, "tables", "*.tmdl"))):
        t = blocs(lire(f))
        src = re.search(r"\tpartition .+? = (\w+)\n(.*?)(?=\n\tannotation|\Z)", lire(f), re.S)
        t["type"] = src.group(1) if src else "?"
        code = ""
        if src:
            m = re.search(r"source =\s*\n(.*)", src.group(2), re.S)
            if m:
                code = "\n".join(l[4:] if l.startswith("\t\t\t\t") else l.strip() for l in m.group(1).split("\n")).strip()
            else:
                m = re.search(r"source = (.*)", src.group(2))
                code = m.group(1).strip() if m else ""
        t["source"] = code
        res.append(t)
    return res


def relations():
    txt = lire(os.path.join(DEF, "relationships.tmdl"))
    rel = []
    for b in txt.split("\nrelationship ")[0:]:
        de = re.search(r"fromColumn: (.+)", b); a = re.search(r"toColumn: (.+)", b)
        if not (de and a):
            continue
        bi = "bidirectionnel" if "bothDirections" in b else "simple"
        card = "1-1" if "fromCardinality: one" in b else "N-1"
        rel.append((de.group(1).strip(), a.group(1).strip(), card, bi))
    return rel


def md_cell(s):
    return (s or "").replace("|", "\\|").replace("\n", " ")


def dictionnaire(T):
    out = ["# Dictionnaire de données", "",
           "> Document **généré** par `tools/generer_documentation.py` à partir des fichiers TMDL. Ne pas modifier à la main.", ""]
    TYPES = {"m": "Power Query (M)", "calculated": "Table calculée (DAX)", "calculationGroup": "Groupe de calcul"}
    out += ["## Vue d'ensemble", "", "| Table | Type | Colonnes | Mesures | Rôle |", "|---|---|---:|---:|---|"]
    for t in T:
        nc = sum(o["genre"] == "column" for o in t["objets"]); nm = sum(o["genre"] == "measure" for o in t["objets"])
        out.append(f"| `{t['nom']}` | {TYPES.get(t['type'], t['type'])} | {nc} | {nm} | {md_cell(' '.join(t['desc'])[:160])} |")
    out += ["", "## Relations", "", "| De (côté N) | Vers (côté 1) | Cardinalité | Filtrage |", "|---|---|---|---|"]
    for r in relations():
        out.append(f"| `{r[0]}` | `{r[1]}` | {r[2]} | {r[3]} |")
    for t in T:
        if t["nom"] == "_Mesures":
            continue
        out += ["", f"## {t['nom']}", "", " ".join(t["desc"]) or "_(sans description)_", "",
                f"**Type** : {TYPES.get(t['type'], t['type'])}", ""]
        cols = [o for o in t["objets"] if o["genre"] == "column"]
        if cols:
            out += ["| Colonne | Type | Masquée | Description |", "|---|---|:-:|---|"]
            for c in cols:
                typ = c["props"].get("dataType", "") + (" (calculée)" if c["calc"] else "")
                out.append(f"| `{c['nom']}` | {typ} | {'oui' if c['props'].get('isHidden') else ''} | {md_cell(' '.join(c['desc']))} |")
        items = [o for o in t["objets"] if o["genre"] == "calculationItem"]
        if items:
            out += ["", "Éléments de calcul : " + ", ".join(f"`{i['nom']}`" for i in items)]
        if t["type"] == "calculated" and t["source"]:
            out += ["", "<details><summary>Expression DAX</summary>", "", "```dax", t["source"], "```", "", "</details>"]
    return "\n".join(out) + "\n"


def catalogue(T):
    mes = [o for t in T for o in t["objets"] if o["genre"] == "measure"]
    par = collections.OrderedDict()
    for m in sorted(mes, key=lambda m: (m["props"].get("displayFolder", "zz"), m["nom"])):
        par.setdefault(m["props"].get("displayFolder", "(sans dossier)"), []).append(m)
    out = ["# Catalogue des mesures DAX", "",
           "> Document **généré** par `tools/generer_documentation.py`. Ne pas modifier à la main.", "",
           f"**{len(mes)} mesures**, toutes dans la table `_Mesures`, rangées par dossier d'affichage.", "",
           "## Sommaire", "", "| Dossier | Mesures |", "|---|---:|"]
    for d, l in par.items():
        out.append(f"| {d} | {len(l)} |")
    for d, l in par.items():
        out += ["", f"## {d}", "", "| Mesure | Format | Masquée | Description |", "|---|---|:-:|---|"]
        for m in l:
            out.append(f"| `{m['nom']}` | {md_cell(m['props'].get('formatString', ''))} | {'oui' if m['props'].get('isHidden') else ''} | {md_cell(' '.join(m['desc']))} |")
        for m in l:
            code = m["expr"]
            if len(code) > MAX_CODE:
                code = code[:MAX_CODE] + f"\n-- … (code tronqué : {len(m['expr']):,} caractères au total, voir le fichier TMDL)".replace(",", " ")
            out += ["", f"<details><summary><code>{m['nom']}</code></summary>", "", "```dax", code, "```", "", "</details>"]
    return "\n".join(out) + "\n"


def powerquery(T):
    dossier = os.path.join(RACINE, "powerquery"); os.makedirs(dossier, exist_ok=True)
    n = 0
    for t in T:
        if t["type"] == "m":
            with open(os.path.join(dossier, t["nom"] + ".pq"), "w", encoding="utf-8") as f:
                f.write(t["source"] + "\n"); n += 1
    exp = lire(os.path.join(DEF, "expressions.tmdl"))
    for m in re.finditer(r"(?:^|\n)expression (\S+) =(.*?)(?=\n\t(?:lineageTag|queryGroup|annotation))", exp, re.S):
        nom, code = m.group(1), m.group(2)
        code = "\n".join(l[2:] if l.startswith("\t\t") else l for l in code.split("\n")).strip()
        with open(os.path.join(dossier, nom + ".pq"), "w", encoding="utf-8") as f:
            f.write(code + "\n"); n += 1
    return n


if __name__ == "__main__":
    T = tables()
    os.makedirs(os.path.join(RACINE, "docs"), exist_ok=True)
    with open(os.path.join(RACINE, "docs", "02_Dictionnaire_donnees.md"), "w", encoding="utf-8") as f:
        f.write(dictionnaire(T))
    with open(os.path.join(RACINE, "docs", "03_Catalogue_mesures.md"), "w", encoding="utf-8") as f:
        f.write(catalogue(T))
    n = powerquery(T)
    print(f"{len(T)} tables, {sum(o['genre']=='measure' for t in T for o in t['objets'])} mesures, {n} requêtes Power Query exportées.")
