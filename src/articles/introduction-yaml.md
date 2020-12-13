# Introduction au YAML

YAML est un format de fichier. C'est une des formes possibles de la *data* dont on entend tout le temps parler. 

Un fichier nommé arbre.yaml est un fichier YAML, comme un fichier arbre.doc serait un fichier Microsoft Word.

Si arbre.doc permet d'écrire par exemple un poème sur les arbres et l'ouvrire avec LibreOffice ou Microsoft Word, arbre.yaml permet de décrire un arbre ! 

Exemple.

```yaml
nom: Bertrand le bouleau
type: bouleau
pays: France
région: Bretagne
```

C'est simple : un *attribut*, deux points, puis la *valeur de l'attribut*. 

Mais on peut faire mieux : le pays et la région, c'est des choses similaires qu'on pourrait regrouper dans un niveau de détail plus bas.


```yaml
nom: Bertrand le bouleau
type: bouleau
localisation:
  pays: France
  région: Bretagne
  ville: Brest
```

L'essentiel, c'est de respecter *l'indentation* : chaque attribut de plus bas niveau est préfixé de deux espaces. 

Maintenant que c'est mieux rangé, on s'est même permis d'ajouter des détails avec la ville (effet rebond).

On peut ajouter des attributs à volonté et dans l'ordre qu'on veut, tout est libre ! Par exemple, si on lui donnait un âge ? En YAML, on peut mettre comme valeur des nombres.


```yaml
nom: Bertrand le bouleau
type: bouleau
âge: 292
localisation:
  pays: France
  région: Bretagne
  ville: Brest
```

Et si on voulait décrire la couleur de Bertrand ? Merde, un boulot ça a en général plusieurs couleurs.

Alors listons des couleurs, rien de plus simple : saut à la ligne, 2 espaces, un tiret, un espace, puis une valeur.



```yaml
nom: Bertrand le bouleau
type: bouleau
couleurs:
  - marron
  - beige
âge: 292
localisation:
  pays: France
  région: Bretagne
  ville: Brest
```

On peut même combiner à volonté les attributs de plus bas niveau et les listes.



```yaml
nom: Bertrand le bouleau
type: bouleau
couleurs:
  tronc:
    - marron
	- beige
  feuilles: vert
âge: 292
voisins: 
  - type: chêne
    nom: Christiane
  - type: if
    nom: Typhaine
localisation:
  pays: France
  région: Bretagne
  ville: Brest
```

Dans mes valeurs, je peux même mettre des liens.

Ou encore des gros bouts de texte, dans ce cas il faut taper le caractère chelou `|` qui devrait être sous la touche 6 de votre clavier (enfin il sert à quelque chose !) puis sauter à la ligne et indenter tout notre roman.

```yaml
nom: Bertrand le bouleau
type: bouleau
en savoir plus: https://fr.wikipedia.org/wiki/Bouleau
note: |
  Les bouleaux font partie de la famille des bétulacées et du genre Betula. La plupart des espèces sont des arbres ; quelques-unes, comme Betula nana, sont des chaméphytes.

  Les bouleaux poussent en général sur les terres pauvres et souvent siliceuses, jusqu'à 2 000 m d'altitude, ainsi que dans les régions arctiques. 

``` 

Une fois que j'ai décrit mon arbre, je vais évidemment être tenté d'en décrire d'autres, c'est bien le but. En décrivant ce premier, on a construit un *schéma*. Qui dit : "un abre, ça doit avoir un nom, un type, des couleurs, etc". 

En respectant le même formalisme pour les prochains, un code informatique pourra facilement utiliser la *data* qu'on a produit :)
