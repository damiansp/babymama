rm(list = ls())

bm <- read.csv('~/babymama/babymamahist/csv/bmData.csv')

head(bm)

bm.m <- as.matrix(bm[, 5:17])
rownames(bm.m) <- sub(' +$', '', bm$phrase)

bm.m[1:10, ]

phrase <- c('gold digger')

freq.plot <- function(phrase, color = 1, add = F, lty = 1, main = '') {
  index <- which(rownames(bm.m) %in% phrase)
  
  if (!add) {
    matplot(
      bm.m[index, ], 
      type = 'l', 
      xlab = 'Year', 
      ylab = 'Frequency', 
      xaxt = 'n', 
      col = color,
      lty = lty,
      main = main)
    axis(1, at = 1:13, labels = 2004:2016)
    #title(paste('Frequency of "', phrase, '"', sep = ''))
  }  

  if (add) {
  	lines(bm.m[index, ], col = color, lty = lty)
  }
}

freq.plot('baby')
freq.plot('mama')
freq.plot('NEGATIVES', color = 2, lty = 2)
freq.plot('POSITIVES', color = 3, add = T, lty = 2)

years <- 2004:2016 
years <- years - 2003
abline(lm(bm.m['NEGATIVES', ] ~ years), col = 2, lty = 1, lwd = 2)
abline(lm(bm.m['POSITIVES', ] ~ years), col = 3, lty = 1, lwd = 2)

legend(
  'topleft', 
  lty = c(2, 1), 
  col = c(2, 2, 3, 3),
  lwd = c(1, 2),
  legend = c(
    'Negative Words', 
    'Average Trend of Negative Words',
    'Positive Words',
    'Average Trend of Positive Words'),
  cex = 0.7)
 
title('Frequency of Positive and Negative Words in Websites\nUsing the Phrase "Baby Mama"')

freq.plot('rapper', main = '"rapper"')
freq.plot('celebrity', main = '"celebrity"')
freq.plot('lawsuit', main = '"lawsuit"')
freq.plot('obama', main = '"obama"')
freq.plot('baby daddy', main = '"baby daddy"')

