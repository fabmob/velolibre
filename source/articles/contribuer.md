# Comment contribuer ? 

## Améliorer un vélo

C'est simple : toutes les spécifications du vélo, y compris les liens vers les magasins en ligne, sont [ici](https://github.com/laem/velolibre/tree/master/vélos).

Pour l'instant, seul le VL1, un gravel, est bien avancé.

### Comment ça marche ? 

On décrit notre vélo dans un fichier .yaml, un format de fichier pour décrire des choses plutôt accessible. 

> Vous ne connaissez pas le YAML ? Pas de problème, on vous explique les bases en 5 minutes chrono dans [le YAML pour les nuls](/documentation/introduction-yaml).

```yaml
nom: Gravel
description: |
  Le vélo libre 1 est un gravel : polyvalent, à l'aise sur 🌳 chemins ou en forêt grâce à ses gros pneus, confortable en 🏙️ ville,  et respectable pour prendre de la vitesse sur 🚵 route.
composants:
  cadre: 
    note: Pas facile de choisir un cadre.
	marque: Merlin
	modèle: Malt G2X
	...
  freins: 
    ...
```

Chaque composant décrit sera illustré avec une icône, certaines glânées sur l'internet mondial, d'autres faites maison. C'est du SVG et elles sont toutes [ici](https://github.com/laem/velolibre/tree/master/dist/composants), n'hésitez pas à en ajouter ou les améliorer ! 


Pour chaque composant du vélo, on peut décrire les choses progressivement selon un schéma précis, en voici une présentation.

### Attributs du composant 

Mettre le `modèle`, la `marque`, le `prix`, l'`url` d'achat de la pièce, la `quantité` requise (par exemple, deux pédales vendues à l'unité), etc.

La liste des attributs possibles n'est pas encore fixée, car ce projet est tout jeune, inspirez-vous du travail existant !

### Les composants alternatifs

S'il y a plusieurs alternatives pour un composant (par exemple deux types de pneus intéressants), il faut alors lister ces alternatives dans un attribut de type liste `alternatives`.

```yaml
composants: 
  étriers de frein: 
    note: Pleins de choix là ! Voilà ce que j'ai trouvé
	inclus: 
	  - disques
	alternatives: 
      - marque: TRP
	    modèle: Spyre
		prix: 70€
		url: https://...
      - marque: Shimano
	    modèle: HG666 super plus
		prix: 90€
		url: https://...
```

Ces alternatives peuvent avoir des attributs en communs (par exemple une note générale sur le composant, ou le fait qu'ils incluent les disques par exemple, ou des specs).

Elles doivent aussi avoir des attributs particuliers, évidemment le prix qui change pour chaque alternative.

Important : **s'il y a plusieurs alternatives, c'est la 1ère qui sera choisie dans l'affichage du site**.

Dans une prochaine version, on pourra faire un choix dynamique où l'on peut cliquer sur un composant pour le sélectionner, en attendant si vous décidez de privilégier un cadre dans une liste d'alternatives, déplacez-le en 1ère position de la liste (c'est relou mais pas si compliqué).

### Les options d'achat

L'attribut liste `achat` permet de lister les options d'achat.

```yaml

composants: 
  étriers de frein: 
    note: Pleins de choix là ! Voilà ce que j'ai trouvé
	inclus: 
	  - disques
    marque: TRP
	modèle: Spyre
	achat:
	  - prix: 70€
		url: https://magasin1.fr/trp-spyre
	  - prix: 75€
		url: https://magasin2.fr/trp_spyre
		url: https://...

```


Les prix peuvent varier entre les boutiques, mais les options aussi ! 

Plus il y a de choix de composants, plus l'écran de commande sera intéressant, pour soit regrouper les achats par magasin, soit faire baisser le prix du vélo.

### Composants inclus dans d'autres


On a vu plus haut, chaque composant est souvent en fait un kit de composants : un étrier de frein peut inclure un disque. Un cadre inclus souvent une fourche et un jeu de direction.

```yaml
composants:
  cadre: 
    inclus: 
	  - fourche
	  - jeu de direction
```

Ceci permet de s'y retrouver, et dans l'hypothèses où l'on aurait renseigné une option de fourche plus bas, elle sera automatiquement désactivée dans l'interface et le calcul du prix pour éviter les doublons.

### Les spécifications

On a commencé à lister des `specs`pour quelques composants, qui nous permettront de faire des vérifications de compatibilité, un des sujets épineux de l'assemblage d'un vélo.

Par exemple :

```yaml
composants: 
  cadre: 
    marque: machin
	modèle: super evo plus n° 10 dma team
	specs:
      boitier de pédalier: BSA 68mm
	  fixations freins disque: flatmount

  boitier de pédalier: 
    marque: bidule
    specs: 
	  boitier de pédalier: BSA 68mm
  étriers de frein:
    marque: Breizh marc'h houarn
	note: |
	  Vélo se dit cheval (marc'h) de fer (houarn) en breton
    specs: 
	  fixations freins disques: postmount

```

On voit dans cette configuration que le boitier de pédalier s'accorde bien avec le cadre, mais que les étriers de freins n'iront pas, ce n'est pas la même norme, il faudra un adaptateur.

Pour l'instant, on peut lister les specs à volonté, mais le site ne fait pas encore de tests de compatibilité. Mais c'est facile à faire, da sune v0 très simple où on teste l'égalité des specs entre composants. 
Il faudra aussi s'occuper des specs d'intervalle : par exemple, le moyeu d'une roue peut être compatible avec des axes d'épaisseur *entre* 10 et 15mm, à voir comment l'exprimer dans l'attribut `specs`.
