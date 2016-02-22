rm(list = ls())

g1 <- read.csv('~/babymama/babymamahist/csv/tfull_1gram.csv')

head(g1)
names(g1) <- c('word', 'count')

total.word.count <- sum(g1$count)
n.years <- 13
n.sites <- n.years * 30
mean.words.per.site <- total.word.count / n.sites

g1$observed <- g1$count / total.word.count
g1$log.obs <- log(g1$observed)
head(g1)

g2 <- read.csv('~/babymama/babymamahist/csv/tfull_2gram.csv', header = F)
head(g2)
names(g2) <- c('w1', 'w2', 'count')


# For each word in g2, get the single-word probability
# @param source: the source of the words whose probabilities are being looked up
# @return pv: the probability vector--where the probabilities will be written to 
assign.probs <- function(source) {
  pv <- numeric(length(source))
  
  for (w in 1:length(source)) {
    prob <- g1$observed[which(as.character(g1$word) == source[w])]
    if (length(prob) > 0) {
      pv[w] <- prob
    } else {
  	  pv[w] <- NA
    }
  }
  
  return (pv)
}

g2$p1 <- assign.probs(g2$w1)
g2$p2 <- assign.probs(g2$w2)
g2$joint.prob.nonnorm <- g2$p1 * g2$p2
g2$joint.prob <- g2$joint.prob.nonnorm / sum(g2$joint.prob.nonnorm, na.rm = T)
g2$expected <- g2$joint.prob * sum(g2$count)
g2$disparity <- g2$count / g2$expected

# remove all rows where disparity <= 1
infrequent <- which(g2$disparity <= 1)
g2 <- g2[-infrequent, ]

# remove all with < 10 observations
rare <- which(g2$count < 10)
g2 <- g2[-rare, ]

head(g2)
g2$score <- scale(g2$count) + scale(g2$disparity)

write.csv(g2, '~/babymama/babymamahist/csv/tfull_2gram_odds.csv')



g3 <- read.csv('~/babymama/babymamahist/csv/tfull_3gram.csv', header = F)
head(g3)
names(g3) <- c('w1', 'w2', 'w3', 'count')

g3$p1 <- assign.probs(g3$w1)
g3$p2 <- assign.probs(g3$w2)
g3$p3 <- assign.probs(g3$w3)
g3$joint.prob.nonnorm <- g3$p1 * g3$p2 * g3$p3
g3$joint.prob <- g3$joint.prob.nonnorm / sum(g3$joint.prob.nonnorm, na.rm = T)
g3$expected <- g3$joint.prob * sum(g3$count)
g3$disparity <- g3$count / g3$expected

# remove all rows where disparity <= 1
infrequent <- which(g3$disparity <= 1)
g3 <- g3[-infrequent, ]

# remove all with < 8 observations
rare <- which(g3$count < 8)
g3 <- g3[-rare, ]
g3$score <- scale(g3$count) + scale(g3$disparity)

write.csv(g3, '~/babymama/babymamahist/csv/tfull_3gram_odds.csv')



g4 <- read.csv('~/babymama/babymamahist/csv/tfull_4gram.csv', header = F)
head(g4)
names(g4) <- c('w1', 'w2', 'w3', 'w4', 'count')

g4$p1 <- assign.probs(g4$w1)
g4$p2 <- assign.probs(g4$w2)
g4$p3 <- assign.probs(g4$w3)
g4$p4 <- assign.probs(g4$w4)
g4$joint.prob.nonnorm <- g4$p1 * g4$p2 * g4$p3 * g4$p4
g4$joint.prob <- g4$joint.prob.nonnorm / sum(g4$joint.prob.nonnorm, na.rm = T)
g4$expected <- g4$joint.prob * sum(g4$count)
g4$disparity <- g4$count / g4$expected

# remove all rows where disparity <= 1
infrequent <- which(g4$disparity <= 1)
g4 <- g4[-infrequent, ]

# remove all with < 6 observations
rare <- which(g4$count < 6)
g4 <- g4[-rare, ]
g4$score <- scale(g4$count) + scale(g4$disparity)

write.csv(g4, '~/babymama/babymamahist/csv/tfull_4gram_odds.csv')


