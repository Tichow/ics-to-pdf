# 🔧 Guide de dépannage

## Erreur "Out of bounds access" lors de la génération du PDF

### Symptômes
- Le calendrier se charge correctement (nombre d'événements affiché)
- Erreur lors du clic sur "Télécharger" ou "Aperçu"
- Message : "Out of bounds access"

### Solutions

#### 1. Vérifier la console du navigateur

Ouvrez la console de développement (F12) et recherchez les logs :
- `CalendarDocument: Génération avec X événements`
- Warnings sur des événements avec dates invalides
- Warnings sur des positions invalides

#### 2. Tester avec le fichier exemple simple

Utilisez le fichier `exemple-simple.ics` fourni :
```bash
# Glissez-déposez exemple-simple.ics dans l'interface
```

Si ça fonctionne, le problème vient de votre fichier ICS original.

#### 3. Événements problématiques courants

Les événements suivants peuvent causer des problèmes :

**Événements "toute la journée"**
- Ces événements n'ont pas d'heure spécifique
- Solution : Ils seront automatiquement filtrés

**Événements hors plage horaire (avant 8h ou après 20h)**
- Solution : Ils sont automatiquement tronqués à 8h-20h

**Événements sur plusieurs jours**
- Solution : Affichés sur chaque jour concerné

**Événements avec dates invalides**
- Solution : Automatiquement filtrés avec warning dans la console

#### 4. Réduire la période d'export

Si vous avez beaucoup d'événements (>200) :
1. Réduisez la période (ex: 1 semaine au lieu de 1 mois)
2. Générez plusieurs PDFs pour différentes périodes

#### 5. Nettoyer le cache du navigateur

```bash
# Chrome/Edge
Ctrl+Shift+Delete (Windows) ou Cmd+Shift+Delete (Mac)

# Firefox
Ctrl+Shift+Del (Windows) ou Cmd+Shift+Del (Mac)
```

Puis rechargez la page avec Ctrl+F5 (ou Cmd+R sur Mac)

## Problème de chargement via URL

### Symptômes
- Le chargement via fichier local fonctionne
- Le chargement via URL échoue
- Erreur CORS ou "Failed to fetch"

### Solutions

#### 1. Vérifier l'URL

- L'URL doit être accessible publiquement
- L'URL doit pointer vers un fichier `.ics` (pas une page HTML)
- Testez l'URL dans votre navigateur

#### 2. Problèmes CORS

L'application essaie automatiquement d'utiliser un proxy si CORS bloque.

Si ça ne fonctionne pas :
1. Téléchargez le fichier ICS manuellement
2. Utilisez l'import par fichier local

#### 3. Calendriers Google/Apple

**Google Calendar** :
1. Paramètres > Paramètres de partage
2. Cochez "Rendre disponible publiquement"
3. Copier l'URL secrète au format iCal

**Apple Calendar (iCloud)** :
1. Calendrier.app > Partage
2. Calendrier public
3. Copier le lien webcal://... et remplacer webcal par https

## Console vide (pas de logs)

### Si vous ne voyez rien dans la console :

#### 1. Ouvrir correctement la console

**Chrome/Edge** :
- Windows/Linux : F12 ou Ctrl+Shift+I
- Mac : Cmd+Option+I

**Firefox** :
- Windows/Linux : F12 ou Ctrl+Shift+K
- Mac : Cmd+Option+K

**Safari** :
- Activer d'abord le menu Développement :
  - Préférences > Avancées > Cocher "Afficher le menu Développement"
- Cmd+Option+C

#### 2. Sélectionner l'onglet "Console"

Assurez-vous d'être dans l'onglet "Console" et pas "Network" ou autre.

#### 3. Niveaux de logs

Vérifiez que tous les niveaux sont activés :
- ✓ Errors (rouge)
- ✓ Warnings (jaune)
- ✓ Logs (gris)
- ✓ Info (bleu)

#### 4. Recharger après ouverture de la console

1. Ouvrez la console
2. Rechargez la page (F5 ou Cmd+R)
3. Chargez à nouveau votre fichier ICS
4. Tentez la génération du PDF

## Performance lente

### Si la génération prend >10 secondes :

1. **Réduire le nombre d'événements**
   - Limitez la période à 1-2 semaines maximum
   - Filtrez votre calendrier avant export

2. **Vérifier les ressources système**
   - Fermez les autres onglets
   - Libérez de la mémoire RAM

3. **Utiliser un navigateur moderne**
   - Chrome 100+
   - Firefox 100+
   - Edge 100+
   - Safari 15+

## Besoin d'aide supplémentaire ?

1. **Copiez les logs de la console** :
   - Clic droit dans la console > Save as...
   - Ou capture d'écran des erreurs

2. **Informations à fournir** :
   - Navigateur et version
   - Système d'exploitation
   - Nombre d'événements
   - Période sélectionnée
   - Type d'import (fichier/URL)
   - Messages d'erreur complets

3. **Créer une issue GitHub** avec ces informations

---

**Astuce** : Testez toujours avec `exemple-simple.ics` d'abord pour vérifier que l'application fonctionne correctement avant d'utiliser votre propre fichier ICS.

